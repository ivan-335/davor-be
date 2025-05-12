import { Router } from 'express';
import { listPins, createPin } from '../controller/pins.controller';
import { requireAuth } from '../middleware/auth.middleware';

export const pinsRouter = Router()
    .get('/', requireAuth, listPins)
    .post('/', requireAuth, createPin);
