import { Router } from 'express';

import { createExercise, deleteExercise, getAllExercises } from '../controllers/execise.controller';

const router = Router();

router.post('/exercise/', createExercise);

router.get('/exercises', getAllExercises);

router.delete('/exercise/:id', deleteExercise);

export default router;
