import { faker } from '@faker-js/faker';
import { User } from './../models/user';
import { Exercise } from './../models/exercise';
import { getAllExercisesDto, saveExcercise } from './exercise.service';

const userModel = {
  dataValues: {
    user_id: '6e00e953-3b45-486e-966c-a779b9025779',
    name: 'Bruno Diaz',
    username: 'batman',
    password: '123',
  },
};

const mockFindByPk = jest.fn().mockResolvedValue(userModel);
jest.mock('./../models/user', () => {
  return jest.fn().mockImplementation(() => {
    return { findByPk: mockFindByPk };
  });
});

const mockFindAll = jest.fn().mockResolvedValue([
  {
    dataValues: {
      id: '0d9add9b-ba67-4043-979b-153a6f0985a6',
      content: 'sample content',
      user_id: '39377a9b-b200-4f16-9fb2-3a906a73a002',
      created_at: '2023-06-15T03:00:05.000Z',
    },
  },
  {
    dataValues: {
      id: '27a64d9d-a66f-4aa5-ba91-6fdbb47e9d86',
      content: 'Loit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Addddenean m',
      user_id: '6e00e953-3b45-486e-966c-a779b9025779',
      created_at: '2023-06-15T01:15:45.000Z',
    },
  },
]);
const createdExercise = {
  dataValues: {
    id: '27a64d9d-a66f-4aa5-ba91-6fdbb47e9d86',
    content: 'Loit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Addddenean m',
    user_id: '6e00e953-3b45-486e-966c-a779b9025779',
    created_at: '2023-06-15T01:15:45.000Z',
  },
};
const mockCount = jest.fn().mockResolvedValue(5);
const mockCreateExercise = jest.fn().mockResolvedValue(createdExercise);
jest.mock('./../models/exercise', () => {
  return jest.fn().mockImplementation(() => {
    return { findAll: mockFindAll, count: mockCount, create: mockCreateExercise };
  });
});

describe('getAllExercisesDto', () => {
  it('returns an array of exerciseDTO from given an array of exercise db model', () => {
    const expectedExercises = [
      {
        id: '0d9add9b-ba67-4043-979b-153a6f0985a6',
        content: 'sample content',
        user_id: '39377a9b-b200-4f16-9fb2-3a906a73a002',
        created_at: '2023-06-15T03:00:05.000Z',
        user: {
          name: 'Simon Kautzer',
        },
      },
      {
        id: '27a64d9d-a66f-4aa5-ba91-6fdbb47e9d86',
        content: 'Loit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Addddenean m',
        user_id: '6e00e953-3b45-486e-966c-a779b9025779',
        created_at: '2023-06-15T01:15:45.000Z',
        user: {
          name: 'Bruno Diaz',
        },
      },
    ];

    const exercisesDTO = getAllExercisesDto();

    expect(exercisesDTO).toStrictEqual(expectedExercises);
  });
});

describe('saveExcercise', () => {
  it('should returns exerciseDto after saving the exercise', () => {
    const expectedExercise = {
      id: '27a64d9d-a66f-4aa5-ba91-6fdbb47e9d86',
      content: 'Loit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Addddenean m',
      user_id: '6e00e953-3b45-486e-966c-a779b9025779',
      created_at: '2023-06-15T01:15:45.000Z',
      user: {
        name: 'Bruno Diaz'
      }
    };
    const exerciseRequestDto = { user_id: userModel.dataValues.user_id, content: faker.lorem.text() };

    const newExercise = saveExcercise(exerciseRequestDto);

    expect(newExercise).toBe(expectedExercise)
  });
});
