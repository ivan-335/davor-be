import { Router } from 'express';
import { listProjects, getProject, createProject, editProject, deleteProject } from '../controller/projects.controller';
import { requireAuth } from '../middleware/auth.middleware';

export const projectsRouter = Router()
    .get('/', requireAuth, listProjects)
    .get('/:id', requireAuth, getProject)
    .post('/', requireAuth, createProject)
    .put('/:id', requireAuth, editProject)
    .delete('/:id', requireAuth, deleteProject);
