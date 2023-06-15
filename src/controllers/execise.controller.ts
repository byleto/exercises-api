import { RequestHandler } from 'express';
import { getAllExercisesDto, saveExcercise } from '../services/exercise.service';
import { Exercise_Busuu } from './../models/exercise';
import { HttpCodes } from '../constants';
import { ReachLimitError } from '../exceptions/ReachLimitError';
import { NotFoundError } from '../exceptions/NotFoundError';

const getErrorStatusCode = (error: any) => {
  if (error instanceof ReachLimitError) {
    return HttpCodes.badRequest;
  }
  return error instanceof NotFoundError ? HttpCodes.notFound : HttpCodes.serviceUnavailable;
};

export const createExercise: RequestHandler = async (req, res) => {
  try {
    const exercise = await saveExcercise({ ...req.body });
    res.set('Access-Control-Allow-Origin', '*');
    return res.status(HttpCodes.created).json({ message: 'Exercise created successfully', created_exercise: exercise });
  } catch (err: any) {
    const statusCode =getErrorStatusCode(err)
    return res.status(statusCode).json({
      error: {
        code: statusCode,
        message: `Invalid request, ${err.message}`,
      },
    });
  }
};

export const deleteExercise: RequestHandler = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const { id } = req.params;
  try {
    const deletedExercise: Exercise_Busuu | null = await Exercise_Busuu.findByPk(id);
    await Exercise_Busuu.destroy({ where: { id } });
    return res.status(HttpCodes.success).json({ message: 'Exercise deleted successfully', data: deletedExercise });
  } catch (err: any) {
    return res.status(HttpCodes.serviceUnavailable).json({
      error: {
        code: HttpCodes.notFound,
        message: `Invalid request, ${err.message}`,
      },
    });
  }
};

export const getAllExercises: RequestHandler = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  try {
    const allExercises = await getAllExercisesDto();
    return res.status(HttpCodes.success).json(allExercises);
  } catch (err: any) {
    return res.status(HttpCodes.serviceUnavailable).json({
      error: {
        code: HttpCodes.notFound,
        message: `Invalid request, ${err.message}`,
      },
    });
  }
};
