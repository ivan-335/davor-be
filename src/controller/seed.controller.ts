import { Request, Response } from 'express';
import { faker } from '@faker-js/faker';
import { Project } from '../model/Project';
import { User } from '../model/User';
import bcrypt from 'bcryptjs';

export async function seed(req: Request, res: Response) {
    // create some users
    const users = await Promise.all(
        Array.from({ length: 5 }).map(() =>
            new User({
                name: faker.person.fullName(),
                email: faker.internet.email(),
                isVerified: true,
                passwordHash: bcrypt.hashSync('somePass123', 10),
            }).save()
        )
    );
    // create projects
    const projects = await Promise.all(
        Array.from({ length: 20 }).map(() =>
            new Project({
                title: faker.lorem.sentence(),
                description: faker.lorem.paragraph(),
                status: faker.helpers.arrayElement([1, 2, 3, 4]),
                budget: faker.helpers.arrayElement(['1M', '1.5M', '3M', '500K']),
                deadline: faker.date.soon(),
                user: users[0]._id,
            }).save()
        )
    );
    res.json({ users, projects });
}
