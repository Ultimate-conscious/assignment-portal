import { Router } from "express";
import { assignmentSubmitSchema, LoginSchema, RegistrationSchema } from "../types/InputValidation";
import { userModel } from "../models/user";
import { assignmentModel } from "../models/assignment";
import { adminModel } from "../models/admin";
import { sign } from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import { authMiddleware } from "../authMiddleware";

export const userRouter = Router();

userRouter.post('/register', async (req, res) => {

    try{
        const { name, username, password } = req.body;
        const {success} = RegistrationSchema.safeParse(req.body);
        // input validation using zod
        if (!success) {
            res.status(400).json({
                message: 'Invalid Input Data'
            });
            return;
        }
        //checking if the user already exists
        const existingUser = await userModel.findOne({
            username
        })

        if (existingUser) {
            res.status(400).json({
                message: 'User already exists, choose another username'
            });
            return;
        }
        //password hashing
        const hashedPassword = bcrypt.hashSync(password, 10);

        const newUser = new userModel({
            name,
            username,
            password:hashedPassword
        });
        await newUser.save();

        //creating a jwt token for authentication
        const token = sign({
            id: newUser._id,
            username
        }, process.env.JWT_SECRET ||"",{
            expiresIn: '24h'
        });

        res.json({
            message: 'User Saved Successfully, and Logged In',
            token
        });
    }catch(err){
        console.log("Error Caused in Registering User", err);
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
});

userRouter.post('/login',async (req, res) => {

    try {
        
        const { username, password } = req.body;
        const {success} = LoginSchema.safeParse(req.body);
    
        if (!success) {
            res.status(400).json({
                message: 'Invalid data'
            });
            return;
        }
    
        const user = await userModel.findOne({
            username
        })
        if(!user) {
            res.status(400).json({
                message: 'User not found, please register'
            });
            return;
        }
        const correctPw =  bcrypt.compareSync(password, user.password);
        if(!correctPw) {
            res.status(400).json({
                message: 'Invalid Password, please try again'
            });
            return;
        }
        const token = sign({
            id: user._id,
            username
        }, process.env.JWT_SECRET ||"",{
            expiresIn: '24h'
        });
    
        res.json({
            message: 'User Logged In Successfully',
            token
        });

    } catch (error) {
        console.log("Error Caused in Logging In User", error);
        res.status(500).json({
            message: 'Internal Server Error'
        });
        
    }

});

// authmiddleware is used to authenticate if the client is allowed to access the route
// this middleware is used to secure multiple routes
userRouter.post('/upload', authMiddleware, async (req, res) => {
    try {
        
        const { username, task, admin } = req.body;
        const {success} = assignmentSubmitSchema.safeParse(req.body);
    
        if (!success) {
            res.status(400).json({
                message: 'Invalid data'
            });
            return;
        }
        //checking if the assignment is already submitted
        const existingSubmission = await assignmentModel.findOne({
            username,
            task
        })
        if(existingSubmission) {
            res.json({
                message: 'Assignment already submitted'
            });
            return;
        }
        //getting the current time
        const submitTime = new Date();
    
        const submission = await assignmentModel.create({
            username,
            task,
            admin,
            submitTime
        });
        await submission.save();

        res.json({
            message: 'Assignment Submitted Successfully'
        });

    } catch (error) {
        console.log("Error Caused in Uploading Assignment", error);
        res.status(500).json({
            message: 'Internal Server Error'
        });
        
    }

});

userRouter.get('/admins',authMiddleware,async (req, res) => {
    try {
        const admins = await adminModel.find();
    
        const response = admins.map(admin => {
            return {
                name: admin.name,
                username: admin.username
            }
        })
        res.json({
            admins: response
        })
        
    } catch (error) {
        console.log("Error Caused in Getting Admins", error);
        res.status(500).json({
            message: 'Internal Server Error'
        });
        
    }
});