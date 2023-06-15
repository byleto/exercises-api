import { Exercise_Busuu } from '../models/exercise';
import { User_Busuu } from '../models/user';
import isEmpty from 'lodash/isEmpty';
import { ReachLimitError } from '../exceptions/ReachLimitError';
import { NotFoundError } from '../exceptions/NotFoundError';

const MAX_NUMBER_OF_EXERCISES = 10;

export type ExerciseResponseDTO = {
  id?: string;
  user_id: string;
  content: string;
  created_at: Date;
  user: { name: string };
};

export type ExerciseRequestDTO = {
  user_id: string;
  content: string;
};

const buildExerciseDTO = (exercise: Exercise_Busuu, user: User_Busuu | null): ExerciseResponseDTO => {
  const {
    ['updatedAt']: updatedAt,
    createdAt: created_at,
    exercise_id: id,
    ...exerciseWithFormat
  } = exercise.dataValues;
  return { id, ...exerciseWithFormat, created_at, user: { name: user?.name } };
};

export const getAllExercisesDto = async () => {
  const allExercise: Exercise_Busuu[] = await Exercise_Busuu.findAll();
  const exercises = Promise.all(
    allExercise.map(async (exercise: Exercise_Busuu) => {
      const user: User_Busuu | null = await User_Busuu.findByPk(exercise.dataValues.user_id);
      return buildExerciseDTO(exercise, user);
    }),
  );
  return exercises;
};

export const saveExcercise = async (exerciseEntryDTO: ExerciseRequestDTO) => {
  const user: User_Busuu | null = await User_Busuu.findByPk(exerciseEntryDTO.user_id);
  if (isEmpty(user)) {
    throw new NotFoundError('User not found');
  }
  const countExistingExercises = await Exercise_Busuu.count({
    where: {
      user_id: user.user_id,
    },
  });
  if (countExistingExercises === MAX_NUMBER_OF_EXERCISES) {
    throw new ReachLimitError();
  }
  const exercise = await Exercise_Busuu.create({
    content: exerciseEntryDTO.content,
    user_id: exerciseEntryDTO.user_id,
  });
  return buildExerciseDTO(exercise, user);
};
