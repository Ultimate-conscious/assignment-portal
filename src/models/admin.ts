import { Schema, model, Document } from 'mongoose';

export interface IAdmin extends Document {
    name: string;
    username: string;
    password: string;
}
  
const adminSchema: Schema = new Schema({
    name: { 
        type: String,
        required: true,
        trim: true
    },
    username: { 
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: { 
        type: String,
        required: true 
    }
});

export default model<IAdmin>('Admin', adminSchema);