import { Schema, model, Document, Types } from 'mongoose';

enum Status {
    Active = 1,
    OnHold = 2,
    InProgress = 3,
    Completed = 4
}

export interface Project extends Document {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    description: string;
    title: string;
    deadline?: Date;
    status: Status;
    budget: string;
    createdAt: Date;
}

const projectSchema = new Schema<Project>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, required: true },
    title: { type: String, required: true },
    deadline: { type: Date, required: false },
    status: { type: Number, required: true },
    budget: { type: String, required: true },
}, { timestamps: true });

export const Project = model<Project>('Project', projectSchema);
