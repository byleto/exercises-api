import { RequestHandler } from 'express';
import { getAllExercisesDto, saveExcercise } from '../services/exercise.service';
import { Exercise } from './../models/exercise';

export const createExercise: RequestHandler = async (req, res, next) => {
  const exercise = await saveExcercise({ ...req.body });
  res.set('Access-Control-Allow-Origin', '*');
  return res.status(200).json({ message: 'Exercise created successfully', created_exercise: exercise });
};

export const deleteExercise: RequestHandler = async (req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  const { id } = req.params;
  const deletedExercise: Exercise | null = await Exercise.findByPk(id);
  await Exercise.destroy({ where: { id } });
  return res.status(200).json({ message: 'Exercise deleted successfully', data: deletedExercise });
};

export const getAllExercises: RequestHandler = async (req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  const allExercises = await getAllExercisesDto(); //add try catch
  return res.status(200).json(allExercises);
};
