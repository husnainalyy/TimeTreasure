import mongoose, { Schema, Document } from 'mongoose';

export interface User extends Document {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    timeCapsules: mongoose.Schema.Types.ObjectId[];
}

const userSchema = new Schema<User>(
    {
        firstName: { type: String, required: true, trim: true, lowercase: true },
        lastName: { type: String, required: true, trim: true, lowercase: true },
        email: { type: String, unique: true, required: true, trim: true, lowercase: true },
        phoneNumber: { type: String, unique: true, required: true }, // Changed to string
        password: { type: String, required: true },
        verifyCode: { type: String },
        verifyCodeExpiry: { type: Date },
        isVerified: { type: Boolean, default: false },
        timeCapsules: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TimeCapsule' }],
    },
    { timestamps: true }
);


export const UserModel = (mongoose.models.UserModel as mongoose.Model<User>) || mongoose.model<User>("UserModel", userSchema)
