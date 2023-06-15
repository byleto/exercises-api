import { Router } from 'express';
import { schemas } from "../middlewares/validationSchemas";
import { validationMiddleware } from "../middlewares/validationMiddleware";

import { createExercise, deleteExercise, getAllExercises } from '../controllers/execise.controller';

const router = Router();

router.post('/exercise/',validationMiddleware(schemas.createExercisePost), createExercise);

router.get('/exercises', getAllExercises);

router.delete('/exercise/:id', deleteExercise);

export default router;
