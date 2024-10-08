import { Schema, model, Document } from 'mongoose';

type statusType = "accepted"| "rejected" | "pending";

export interface IAssignment extends Document {
    username: string;
    task: string;
    admin: string;
    submitTime: Date;
    status: statusType;
}

//assuming username and task can uniquely identify an assignment
const assignmentSchema: Schema = new Schema({
    username: { 
        type: String,
        required: true,
        trim: true
    },
    task: { 
        type: String,
        required: true,
        trim: true
    },
    admin: { 
        type: String,
        required: true,
        trim: true
    },
    submitTime: { 
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "pending",
        enum: ["accepted", "rejected", "pending"]
    }
});


export const assignmentModel = model<IAssignment>('Assignment', assignmentSchema);