// import * as csv from 'fast-csv';
import csv from 'csvtojson';
import path from 'path';
import fs from 'fs';
import Joi from '@hapi/joi';
import { handleSuccess, handleError } from '../utils/response';
// import  '../../data.csv'

const options = {
  language: {
    key: '{{object.key}} ',
  },
};

export const validate = async (req, res) => {
  const schema = Joi.array().items(
    Joi.object({
      Transaction: Joi.string().alphanum().min(3).max(30).required().messages({
        'string.base': `Transaction should be a string`,
        'string.empty': `Transaction cannot be an empty`,
        'any.required': `Transaction is a required field`,
      }),
      ID: Joi.number().required().messages({
        'number.base': `ID should be a Number`,
        'string.empty': `ID cannot be an empty`,
        'any.required': `ID is a required field`,
      }),
      Status: Joi.string()
        // valid('Accepted', 'Pending', 'Open', 'Closed')
        .required()
        .messages({
          'string.base': `Status should be a string`,
          'string.empty': `Status cannot be an empty`,
          'any.required': `Status is a required field`,
        }),
      'Transaction Date': Joi.string()
        .regex(/(0[1-9]|[12]\d|3[01])-(0[1-9]|1[0-2])-([12]\d{3})/)
        .required()
        .messages({
          'string.pattern.base': `Due date should be a valid date of format DD-MM-YYYY`,
          'string.empty': `Transaction Date cannot be an empty`,
          'any.required': `Transaction Date is a required field`,
        }),
      'Due Date': Joi.string()
        .regex(/(0[1-9]|[12]\d|3[01])-(0[1-9]|1[0-2])-([12]\d{3})/)
        .required()
        .messages({
          'string.pattern.base': `Due date should be a valid date of format DD-MM-YYYY`,
          'string.empty': `Due date cannot be an empty`,
          'any.required': `Due date is a required field`,
        }),
      'Customer or Supplier': Joi.string().required().messages({
        'string.base': `Customer should be a string`,
        'string.empty': `Customer cannot be an empty`,
        'any.required': `Customer is a required field`,
      }),
      Item: Joi.string().required().messages({
        'string.base': `Item should be a string`,
        'string.empty': `Item cannot be an empty`,
        'any.required': `Item is a required field`,
      }),
      Quantity: Joi.number().required().messages({
        'number.base': `Quantity should be a number`,
        'string.empty': `Quantity cannot be an empty`,
        'any.required': `Quantity is a required field`,
      }),
      'Unit Amount': Joi.number().required().messages({
        'number.base': `Unit Amount should be a number`,
        'string.empty': `Unit Amount cannot be an empty`,
        'any.required': `Unit Amount is a required field`,
      }),
      'Total Transaction Amount': Joi.number().required().messages({
        'number.base': `Transaction amount should be a number`,
        'string.empty': `Transaction amount cannot be an empty`,
        'any.required': `Transaction amount is a required field`,
      }),
    })
  );

  const converter = csv()
    .fromFile(path.resolve(__dirname, '../../data.csv'))
    .then((data) => {
      try {
        const { error } = schema.validate(data, options);
        if (error) {
          console.log(error);
          return handleError(400, error.details[0].message, res);
        } else {
          handleSuccess(200, 'it works', res, data);
        }
      } catch (error) {
        return handleError(400, error, res);
      }
      //   })
    });
};
