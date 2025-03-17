import * as Joi from '@hapi/joi';

export const CONFIG_SCHEMA = Joi.object({
  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.string().required(),
  DATABASE_USERNAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
  HOST: Joi.string().required(),
  PORT: Joi.string().required(),
});
