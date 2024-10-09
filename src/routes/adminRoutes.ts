import { Router } from "express";
import { LoginSchema, RegistrationSchema } from "../types/InputValidation";
import { adminModel } from "../models/admin";
import { assignmentModel } from "../models/assignment";
import bcrypt from 'bcryptjs';
import { sign } from "jsonwebtoken";
import { authMiddleware } from "../authMiddleware";

export const adminRouter = Router();

//similar to registering a user
adminRouter.post('/register',async (req, res) => {
    try {
        const { name, username, password } = req.body;
        const {success} = RegistrationSchema.safeParse(req.body);
    
        if (!success) {
            res.status(400).json({
                message: 'Invalid Input Data'
            });
            return;
        }
        const existingAdmin = await adminModel.findOne({
            username
        })
    
        if (existingAdmin) {
            res.status(400).json({
                message: 'User already exists'
            });
            return;
        }
        const hashedPassword = bcrypt.hashSync(password, 10);
    
        const newAdmin = new adminModel({
            name,
            username,
            password: hashedPassword
        });
        await newAdmin.save();
    
        const token = sign({
            id: newAdmin._id,
            username
        }, process.env.JWT_SECRET ||"",{
            expiresIn: '24h'
        });
    
        res.json({
            message: 'Admin Saved Successfully',
            token
        });
        
    } catch (error) {
        console.log("Error Caused in Registering Admin", error);
        res.status(500).json({
            message: 'Internal Server Error'
        }); 
    }
});

//similar to logging in a user
adminRouter.post('/login', async(req, res) => {
    try {
        const { username, password } = req.body;
        const {success} = LoginSchema.safeParse(req.body);
    
        if (!success) {
            res.status(400).json({
                message: 'Invalid Input data'
            });
            return;
        }
    
        const admin = await adminModel.findOne({
            username
        })
        if(!admin) {
            res.status(400).json({
                message: 'Admin not found, Please Register'
            });
            return;
        }
        const correctPw =  bcrypt.compareSync(password, admin.password);
        if(!correctPw) {
            res.status(400).json({
                message: 'Invalid Password'
            });
            return;
        }
        const token = sign({
            id: admin._id,
            username
        }, process.env.JWT_SECRET ||"",{
            expiresIn: '24h'
        });
    
        res.json({
            message: 'Admin Logged In Successfully',
            token
        });
        
    } catch (error) {
        console.log("Error Caused in Logging in Admin", error);
        res.status(500).json({
            message: 'Internal Server Error'
        });
        
    }

});

adminRouter.get('/assignments',authMiddleware,async (req, res) => {

    try {
        const {username} = req.body;
    
        //making sure that admin gets only the pending assignments
        const assignments = await assignmentModel.find({
            admin: username,
            status: 'pending'
        });
    
        res.json({
            assignments
        });
        
    } catch (error) {
        console.log("Error Caused in Getting Assignments", error);
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }

    
});
  
adminRouter.post('/assignment/:id/accept',authMiddleware,async (req, res) => {
    try {
        //getting the id from the params
        const { id } = req.params;
    
        const assignment = await assignmentModel.findById({
            _id: id
        });
        //checking if the assignment exists
        if(!assignment) {
            res.status(400).json({
                message: 'No such Assignment Exists with the given ID'
            });
            return;
        }
        //changing the status of the assignment to accepted
        assignment.status = 'accepted';
        await assignment.save();
        res.json({
            message: 'Assignment Accepted Successfully'
        })
        
    } catch (error) {
        console.log("Error Caused in Accepting Assignment", error);
        res.status(500).json({
            message: 'Internal Server Error'
        });
        
    }

});
  
adminRouter.post('/assignment/:id/reject',authMiddleware,async (req, res) => {

    try {
        const { id } = req.params;
    
        const assignment = await assignmentModel.findById({
            _id: id
        });
        if(!assignment) {
            res.status(400).json({
                message: 'No such Assignment Exists with the given ID'
            });
            return;
        }
        //changing the status of the assignment to rejected
        assignment.status = 'rejected';
        await assignment.save();
        res.json({
            message: 'Assignment Rejected Successfully'
        })
        
    } catch (error) {
        console.log("Error Caused in Rejecting Assignment", error);
        res.status(500).json({
            message: 'Internal Server Error'
        });
        
    }
});