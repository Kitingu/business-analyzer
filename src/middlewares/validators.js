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
  static business(req, res, next) {
    const schema = Joi.object().keys({
      name: Joi.string().min(3).max(128).required().messages({
        'string.base': `firstname should be a string of atleast 3 characters`,
        'string.empty': `firstname cannot be an empty`,
        'any.required': `firstname is a required field`,
      }),
      location: Joi.string().alphanum().min(3).required().messages({
        'string.base': `location should be a string of atleast 3 characters`,
        'string.empty': `location cannot be an empty`,
        'any.required': `location is a required field`,
      }),
      address: Joi.string().alphanum().required().messages({
        'string.pattern.base': `address should be a string of atleast 3 characters`,
        'string.empty': `address cannot be an empty`,
        'any.required': `address is a required field`,
      }),
      countries: Joi.string().required().messages({
        'string.pattern.base': `countries should be a comma separated list`,
        'string.empty': `countries cannot be an empty`,
        'any.required': `countries is a required field`,
      }),
      revenue: Joi.number().required().messages({
        'string.pattern.base': `revenue should be a number`,
        'string.empty': `revenue cannot be an empty`,
        'any.required': `revenue is a required field`,
      }),
      software: Joi.string().alphanum().required().messages({
        'string.pattern.base': `software should be a valid string`,
        'string.empty': `software cannot be an empty`,
        'any.required': `software is a required field`,
      }),
      abbreviation: Joi.string().alphanum().required().messages({
        'string.pattern.base': `abbreviation should be a valid string`,
        'string.empty': `abbreviation cannot be an empty`,
        'any.required': `abbreviation is a required field`,
      }),
      country: Joi.string().alphanum().required().messages({
        'string.pattern.base': `country should be a valid string`,
        'string.empty': `country cannot be an empty`,
        'any.required': `country is a required field`,
      }),
      entity: Joi.string().alphanum().required().messages({
        'string.pattern.base': `entity should be a valid string`,
        'string.empty': `entity cannot be an empty`,
        'any.required': `entity is a required field`,
      }),
    });

    validator(req, res, schema, next);
  }
}
