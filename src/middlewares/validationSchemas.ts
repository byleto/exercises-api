import Joi from "joi";

export const schemas = {
  createExercisePost: Joi.object().keys({
    user_id: Joi.string().required(),
    content: Joi.string().required().max(100),
  }),
};
