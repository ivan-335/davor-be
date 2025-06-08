import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
    email: string;
    name: string
    passwordHash: string;
    isVerified: boolean;
}

const userSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: false },
    passwordHash: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
}, { timestamps: true });

export const User = model<IUser>('User', userSchema);
