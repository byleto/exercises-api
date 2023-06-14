import { Router } from 'express';

import { createUser, deleteUser, getAllUsers } from '../controllers/user.controller';

const router = Router();

router.post('/user/', createUser);

router.get('/users', getAllUsers);

router.delete('/user/:id', deleteUser);

export default router;
