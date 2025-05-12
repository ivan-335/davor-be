import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { authRouter } from './route/auth.routes';
import { pinsRouter } from './route/pins.routes';

dotenv.config();
const app = express();
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/pins', pinsRouter);

mongoose
    .connect(process.env.MONGO_URI!)
    .then()
    .catch(err => console.error(err));

app.listen(process.env.PORT, () =>
    console.log(`Server running on port ${process.env.PORT}`)
);
