import request from 'supertest';
import { HttpCodes } from '../constants';
import { faker } from '@faker-js/faker';
import { random } from 'lodash';

const port = process.env.NODE_LOCAL_PORT || 5050;
const HOST = 'http://localhost';
const url = `${HOST}:${port}`;
const endpoints = {
  create: '/api/exercise/',
};
describe('exercises controller', () => {
  it('responds with bad request when content attribute is missing from the body', async () => {
    const payload = { user_id: 'random user_id' };

    const res = await request(url).post(endpoints.create).send(payload);

    expect(res.statusCode).toBe(HttpCodes.badRequest);
    expect(res.body.error.code).toBe(HttpCodes.badRequest);
    expect(res.body.error.message).toBe('Invalid request, "content" is required');
  });

  it('responds with bad request when user_id attribute is missing from the body', async () => {
    const payload = { content: 'sample content' };

    const res = await request(url).post(endpoints.create).send(payload);

    expect(res.statusCode).toBe(HttpCodes.badRequest);
    expect(res.body.error.code).toBe(HttpCodes.badRequest);
    expect(res.body.error.message).toBe('Invalid request, "user_id" is required');
  });

  it('responds with bad request when content has more than 100 characters', async () => {
    const payload = {
      user_id: 'random user_id',
      content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean m2',
    };

    const res = await request(url).post(endpoints.create).send(payload);

    expect(res.statusCode).toBe(HttpCodes.badRequest);
    expect(res.body.error.code).toBe(HttpCodes.badRequest);
    expect(res.body.error.message).toBe(
      'Invalid request, "content" length must be less than or equal to 100 characters long',
    );
  });

  it('responds with bad request when content attribute is not a string', async () => {
    const payload = {
      user_id: 'random user_id',
      content: 60,
    };

    const res = await request(url).post(endpoints.create).send(payload);

    expect(res.statusCode).toBe(HttpCodes.badRequest);
    expect(res.body.error.code).toBe(HttpCodes.badRequest);
    expect(res.body.error.message).toBe('Invalid request, "content" must be a string');
  });

  it('responds with bad request when user_id attribute is not a string', async () => {
    const payload = {
      user_id: 1,
      content: 'sample content',
    };

    const res = await request(url).post(endpoints.create).send(payload);

    expect(res.statusCode).toBe(HttpCodes.badRequest);
    expect(res.body.error.code).toBe(HttpCodes.badRequest);
    expect(res.body.error.message).toBe('Invalid request, "user_id" must be a string');
  });

  it('responds with not found when user_id does not exists', async () => {
    const payload = {
      user_id: '1',
      content: 'sample content',
    };

    const res = await request(url).post(endpoints.create).send(payload);

    expect(res.statusCode).toBe(HttpCodes.notFound);
    expect(res.body.error.code).toBe(HttpCodes.notFound);
    expect(res.body.error.message).toBe('Invalid request, User not found');
  });

  it('responds with created status when the exercise has been sucessfully created', async () => {
    const randomName = faker.person.fullName();
    const userPayload = {
      name: randomName,
      username: faker.internet.userName(),
      password: faker.internet.password(),
    };
    const user = (await request(url).post('/api/user').send(userPayload)).body.data;

    const exercisePayload = {
      user_id: user.user_id,
      content: 'sample content',
    };

    const res = await request(url).post(endpoints.create).send(exercisePayload);

    expect(res.statusCode).toBe(HttpCodes.created);
    expect(res.body.message).toBe('Exercise created successfully');
    expect(res.body.created_exercise.content).toBe('sample content');
    expect(res.body.created_exercise.user_id).toBe(user.user_id);
    expect(res.body.created_exercise.user).toStrictEqual({ name: randomName });
  });

  it('responds with created status when the exercise has been sucessfully created', async () => {
    const res = await request(url).get('/api/exercises');

    expect(res.statusCode).toBe(HttpCodes.success);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
