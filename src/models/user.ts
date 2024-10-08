import { Schema, model, Document } from 'mongoose';

//just by adding the role enum to the user model, we can easily accomodate admin and user roles in the same model;
//currently keeping seperate for admin and user for better querying and filtering

//type roleType = "admin" | "user";

export interface IUser extends Document {
  name: string;
  username: string;
  password: string;
    //role: roleType;
}

const userSchema: Schema = new Schema({
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
    },
    // role: {
    //     type: String,
    //     required: true,
    //     enum: ["admin", "user"]
    // }
});

export const userModel = model<IUser>('User', userSchema);