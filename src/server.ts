import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { authRouter } from './route/auth.routes';
import { projectsRouter } from './route/projects.routes';
import { usersRouter } from './route/users.routes';

dotenv.config();
const app = express();
app.use(
    express.json(),
    cors({
        origin: ['http://localhost:5174', 'http://localhost:5173'],
        credentials: true,
    })
);

app.use('/api/auth', authRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/users', usersRouter);

mongoose
    .connect(process.env.MONGO_URI!)
    .then()
    .catch(err => console.error(err));

app.listen(process.env.PORT, () =>
    console.log(`Server running on port ${process.env.PORT}`)
);
