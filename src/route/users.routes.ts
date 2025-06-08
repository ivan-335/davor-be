import { Router } from 'express';
import { listUsers, getUser } from '../controller/users.controller';
import { requireAuth } from '../middleware/auth.middleware';

export const usersRouter = Router()
    .get('/', requireAuth, listUsers)
    .get('/:id', requireAuth, getUser);
