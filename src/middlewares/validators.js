import Joi from '@hapi/joi';
import { handleError } from '../utils/response';

const validator = (req, res, schema, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
   return handleError(400, error.details[0].message, res);
  }
  next();
};

export default class Validate {
  static user(req, res, next) {
    const schema = Joi.object().keys({
      firstname: Joi.string()
        .regex(/^[a-zA-Z]+$/)
        .min(3)
        .max(128)
        .required()
        .messages({
          'string.base': `firstname should be a string of atleast 3 characters`,
          'string.empty': `firstname cannot be an empty`,
          'any.required': `firstname is a required field`,
        }),
      lastname: Joi.string()
        .regex(/^[a-zA-Z]+$/)
        .min(3)
        .max(128)
        .required()
        .messages({
          'string.base': `lastname should be a string of atleast 3 characters`,
          'string.empty': `lastname cannot be an empty`,
          'any.required': `lastname is a required field`,
        }),
      email: Joi.string()
        .regex(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)
        .required()
        .messages({
          'string.pattern.base': `please provide a valid email`,
          'string.empty': `email cannot be an empty`,
          'any.required': `email is a required field`,
        }),
      password: Joi.string()
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,128}$/)
        .required()
        .messages({
          'string.pattern.base': `password should have at least 6 characters, a uppercase,lowercase a number and a special character`,
          'string.empty': `password cannot be an empty`,
          'any.required': `password is a required field`,
        }),
    });

    validator(req, res, schema, next);
  }
}
