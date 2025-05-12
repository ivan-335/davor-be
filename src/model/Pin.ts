import { Schema, model, Document, Types } from 'mongoose';

export interface IPin extends Document {
    user: Types.ObjectId;
    description: string;
    latitude: number;
    longitude: number;
    createdAt: Date;
}

const pinSchema = new Schema<IPin>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
}, { timestamps: true });

export const Pin = model<IPin>('Pin', pinSchema);
