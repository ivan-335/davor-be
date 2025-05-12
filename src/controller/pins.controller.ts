import { Request, Response } from 'express';
import { Pin } from '../model/Pin';
import { AuthRequest } from '../middleware/auth.middleware';

export async function listPins(req: AuthRequest, res: Response) {
    const pins = await Pin.find({ user: req.userId });
    res.json(pins);
}

export async function createPin(req: AuthRequest, res: Response) {
    const { description, latitude, longitude } = req.body;
    const pin = await Pin.create({
        user: req.userId,
        description,
        latitude,
        longitude,
    });
    res.status(201).json(pin);
}
