import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../util/jwt.util';

export interface AuthRequest extends Request {
    userId?: string;
}

export function requireAuth(
    req: AuthRequest,
    res: Response,
    next: NextFunction
) {
    // const auth = req.headers.authorization?.split(' ')[1];
    // if (!auth) return res.status(401).json({ error: 'missing.token' });
    // try {
    //     const payload = verifyToken(auth); 
    //     req.userId = payload.id;
        next();
    // } catch {
    //     res.status(401).json({ error: 'invalid.token' });
    // }
}
