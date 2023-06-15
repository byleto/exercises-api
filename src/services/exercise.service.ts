import { Exercise } from '../models/exercise';
import { User } from '../models/user';
import isEmpty from 'lodash/isEmpty';
import { ReachLimitError } from '../exceptions/ReachLimitError';
import { NotFoundError } from '../exceptions/NotFoundError';
import { ExerciseRequestDTO, ExerciseResponseDTO } from '../types/exercise';

const MAX_NUMBER_OF_EXERCISES = 10;

const buildExerciseDTO = (exercise: Exercise, user: User | null): ExerciseResponseDTO => {
  const {
    ['updatedAt']: updatedAt,
    createdAt: created_at,
    exercise_id: id,
    ...exerciseWithFormat
  } = exercise.dataValues;
  return { id, ...exerciseWithFormat, created_at, user: { name: user?.name } };
};

export const getAllExercisesDto = async () => {
  const allExercises: Exercise[] = await Exercise.findAll();
  const exercises = Promise.all(
    allExercises.map(async (exercise: Exercise) => {
      const user: User | null = await User.findByPk(exercise.dataValues.user_id);
      return buildExerciseDTO(exercise, user);
    }),
  );
  return exercises;
};

export const saveExcercise = async (exerciseEntryDTO: ExerciseRequestDTO) => {
  const user: User | null = await User.findByPk(exerciseEntryDTO.user_id);
  if (isEmpty(user)) {
    throw new NotFoundError('User not found');
  }
  const countExistingExercises = await Exercise.count({
    where: {
      user_id: user.user_id,
    },
  });
  if (countExistingExercises === MAX_NUMBER_OF_EXERCISES) {
    throw new ReachLimitError();
  }
  const exercise = await Exercise.create({
    content: exerciseEntryDTO.content,
    user_id: exerciseEntryDTO.user_id,
  });
  return buildExerciseDTO(exercise, user);
};
