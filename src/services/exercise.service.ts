import e from 'express';
import { Exercise } from '../models/exercise';
import { User } from '../models/user';
import isEmpty from 'lodash/isEmpty';

export type exerciseDTO = {
  id?: string;
  user_id: string;
  content: string;
  created_at: Date;
  user: { name: string };
};

export type ExerciseEntryDTO = {
  user_id: string;
  content: string;
};

export const getAllExercisesDto = async () => {
  const allExercise: Exercise[] = await Exercise.findAll();
  const exercises = Promise.all(
    allExercise.map(async (exercise: Exercise) => {
      const user: User | null = await User.findByPk(exercise.dataValues.userId);
      const userName = !isEmpty(user) ? user.name : 'User not found';
      const { ['updatedAt']: updatedAt, ...exerciseWithoutUpdatedAt } = exercise.dataValues;
      return { ...exerciseWithoutUpdatedAt, user: { name: userName } };
    }),
  );
  return exercises;
};

export const saveExcercise = async (exerciseEntryDTO: ExerciseEntryDTO) => {
  const user: User | null = await User.findByPk(exerciseEntryDTO.user_id);
  if (isEmpty(user)) {
    //trow error message return a 404
  }
  //custom query to get the exercise by user id and do not allow more that 10
  // try catch error return 502
  const exercise = await Exercise.create({ content: exerciseEntryDTO.content, userId: exerciseEntryDTO.user_id });
  const { ['updatedAt']: updatedAt, ...exerciseWithoutUpdatedAt } = exercise.dataValues;
  return { ...exerciseWithoutUpdatedAt, user: { name: user?.name } };
};
