import { Router } from 'express';
import { seed } from '../controller/seed.controller';

export const seedRouter = Router()
    .get('/', seed);
