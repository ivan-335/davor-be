import { Response } from 'express';
import { User } from '../model/User';
import { AuthRequest } from '../middleware/auth.middleware';

export async function listUsers(req: AuthRequest, res: Response) {
    try {
        // const query = '';
        const users = await User.find({}, { email: 1 }).lean();
        console.log(users);
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: 'Error fetching users' });
    }
}

export async function getUser(req: AuthRequest, res: Response) {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "No user with this id" });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: 'Error fetching user' });
    }
}