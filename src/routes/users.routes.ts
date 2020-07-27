import { Router } from 'express';
import { getRepository } from 'typeorm';

import UserService from '../services/UserService';
import User from '../models/User';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();

usersRouter.get('/', ensureAuthenticated, async (request, response) => {
	try {
		const { id } = request.user;

		const usersRepository = getRepository(User);

		const user = await usersRepository.findOneOrFail({ where: { id } });
		delete user?.password;

		return response.json(user);
	} catch (err) {
		return response.status(400).json({ error: err.message });
	}
});

usersRouter.post('/', async (request, response) => {
	try {
		const { name, email, password } = request.body;

		const userSevice = new UserService();

		const user = await userSevice.createUser({ name, email, password });

		delete user.password;

		return response.json(user);
	} catch (err) {
		return response.status(400).json({ error: err.message });
	}
});

usersRouter.put('/', async (request, response) => {});

usersRouter.delete('/', async (request, response) => {});

export default usersRouter;
