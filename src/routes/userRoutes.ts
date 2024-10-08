import { Router } from "express";
import { assignmentSubmitSchema, userLoginSchema, userRegistrationSchema } from "../types/userInputs";
import { userModel } from "../models/user";
import { assignmentModel } from "../models/assignment";
import { adminModel } from "../models/admin";

export const userRouter = Router();

userRouter.post('/register', async (req, res) => {
    const { name, username, password } = req.body;
    const {success} = userRegistrationSchema.safeParse(req.body);

    if (!success) {
        res.status(400).json({
            message: 'Invalid data'
        });
        return;
    }
    const existingUser = await userModel.findOne({
        username
    })

    if (existingUser) {
        res.status(400).json({
            message: 'User already exists'
        });
        return;
    }
    //might want to hash the password here
    const newUser = new userModel({
        name,
        username,
        password
    });
    newUser.save();

    res.json({
        message: 'User Saved Successfully'
    });
});

userRouter.post('/login',async (req, res) => {
    const { username, password } = req.body;
    const {success} = userLoginSchema.safeParse(req.body);

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
            message: 'User not found'
        });
        return;
    }
    //might want to compare the hashed password here
    //return a jwt token here

    res.json({
        message: 'User Logged In Successfully'
    });

});

//should be authenticated route 
userRouter.post('/upload',async (req, res) => {
    const { username, task, admin } = req.body;
    const {success} = assignmentSubmitSchema.safeParse(req.body);

    if (!success) {
        res.status(400).json({
            message: 'Invalid data'
        });
        return;
    }

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

    const submitTime = new Date();

    //save the submission to the database
    const submission = await assignmentModel.create({
        username,
        task,
        admin,
        submitTime
    });

    submission.save();
    res.json({
        message: 'Assignment Submitted Successfully'
    });

});

//should be authenticated route 
userRouter.get('/admins',async (req, res) => {
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
});