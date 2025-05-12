import jwt from 'jsonwebtoken';
import { IUser } from '../model/User';
const secret = process.env.JWT_SECRET!;

export function signToken(user: IUser): string {
    return jwt.sign({ id: user._id, email: user.email }, secret, {
        expiresIn: '7d',
    });
}

export function verifyToken(token: string): { id: string; email: string } {
    return jwt.verify(token, secret) as any;
}
