import { Router } from 'express';
import { register, verifyEmail, login } from '../controller/auth.controller';

export const authRouter = Router()
    .post('/register', register)
    .get('/verify/:token', verifyEmail)
    .post('/login', login);
