import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../model/User';
import { signToken } from '../util/jwt.util';
import { sendVerificationEmail } from '../service/mail.service';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const verifySecret = process.env.JWT_SECRET!;

export async function register(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!password || !email) {
        return res.status(400).json({ message: 'password.and.email.required' });
    }
    if (await User.findOne({ email })) {
        res.json({ message: 'invalid.email' });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, passwordHash });

    const vToken = jwt.sign({ id: user._id }, verifySecret, { expiresIn: '1d' });
    await sendVerificationEmail(email, vToken);
    res.json({ message: 'verification.mail.sent' });
}

export async function verifyEmail(req: Request, res: Response) {
    try {
        const { token } = req.params;
        const payload: any = jwt.verify(token, verifySecret);
        await User.findByIdAndUpdate(payload.id, { isVerified: true });
        // add redirect to FE
        res.json({ message: 'email.verified' });
    } catch {
        res.status(400).json({ error: 'invalid.token' });
    }
}

export async function login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.passwordHash)))
        return res.status(401).json({ error: 'invalid.credentials' });
    if (!user.isVerified)
        return res.status(403).json({ error: 'email.notverified' });
    const token = signToken(user);
    res.json({ token });
}
