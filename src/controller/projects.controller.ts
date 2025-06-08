import { Request, Response } from 'express';
import { Project } from '../model/Project';
import { AuthRequest } from '../middleware/auth.middleware';
import { User } from '../model/User';

export async function listProjects(req: AuthRequest, res: Response) {

    const {
        user,
        status,
        deadline,
        budget,
        title,
        sort = 'createdAt',
        order = 'desc'
    } = req.query;
    const query: Record<string, any> = {};
    if (user) query.user = user;
    if (status) query.status = status;
    if (deadline) query.deadline = deadline;
    if (budget) query.budget = budget;
    if (title) query.title = title;

    const sortKey = sort as string;
    const sortOrder = (order === 'asc' ? 1 : -1) as 1 | -1;
    const sortOptions: { [key: string]: 1 | -1 } = {
        [sortKey]: sortOrder,
    };

    try {
        const [projects, totalCount] = await Promise.all([
            Project.find(query).populate('user', 'email name').sort(sortOptions).lean(),
            Project.countDocuments(query),
        ])

        res.json({
            projects,
            pagination: {
                totalItems: totalCount,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(408).json({ message: 'Error fetching projects' });
    }
}

export async function getProject(req: AuthRequest, res: Response) {
    try {
        const project = await Project.find({ id: req.body.id }).populate('user', 'email name');
        if (!project) {
            return res.json({ 'message': "No project with this id" })
        }
        res.json(project);
    } catch (error) {
        console.error(error);
        res.status(408).json({ message: 'Error fetching project' });
    }
}

export async function createProject(req: AuthRequest, res: Response) {
    const { description, title, status, deadline, budget, user } = req.body;
    let deadlineDate: Date | undefined;
    if (deadline !== undefined) {
        const parsed = new Date(deadline);
        if (isNaN(parsed.getTime())) {
            return res.status(400).json({ message: 'Invalid date format for deadline' });
        }
        deadlineDate = parsed;
    }
    try {
        const project = new Project({
            user: user,
            description,
            title,
            status,
            ...(deadlineDate && { deadline: deadlineDate }),
            budget
        });

        const saved = await project.save();
        await saved.populate('user', 'email name');
        res.status(201).json(saved);
    } catch (error) {
        console.error(error);
        res.status(408).json("Something went wrong " + error);
    }
}

export async function editProject(req: AuthRequest, res: Response) {
    const { id } = req.params;
    const { user, description, title, status, deadline, budget } = req.body;

    try {
        const project = await Project.findById(id);
        if (!project) {
            return res.status(404).json({ message: 'project not found' });
        }

        if (typeof title === 'string') {
            project.title = title.trim();
        }
        if (typeof description === 'string') {
            project.description = description.trim();
        }
        if (typeof status === 'number') {
            project.status = status as Project['status'];
        }
        if (deadline) {
            let deadlineDate: Date | undefined;
            const parsed = new Date(deadline);
            if (isNaN(parsed.getTime())) {
                return res.status(400).json({ message: 'Invalid date format for deadline' });
            }
            deadlineDate = parsed;
        }
        if (typeof budget === 'string') {
            project.budget = budget as Project['budget'];
        }

        if (user) {
            const findUser = await User.findById(user);

            if (!findUser) {
                return res.status(404).json({ message: 'No user found' });
            }
            project.user = findUser._id;
        }

        const updated = await project.save();
        await updated.populate('user', 'email');
        return res.status(200).json(updated)
    } catch (error) {
        console.error('Error updating project:', error);
        return res.status(409).json({ error });
    }
}


export async function deleteProject(req: AuthRequest, res: Response) {
    const { id } = req.params;
    try {
        const project = await Project.findById(id);
        if (!project /*|| project.user.toString() !== req.body.user --- authorization check*/) {
            return res.status(404).json({ message: 'project not found or not authorized' });
        }
        await project.deleteOne();
        return res.status(200).json({ message: 'project deleted successfully' });
    } catch (error) {
        console.log(error);
        return res.status(408).json({ message: 'Error deleting project' });
    }
}
