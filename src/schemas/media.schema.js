const Joi = require('joi');

export const mediaSchema = {
  trailer: {
    value: Joi.string().messages({
      'string.empty': `Trailer cannot be an empty field`,
    }),
  },
  title: {
    value: Joi.string().min(1).max(500).required().messages({
      'string.empty': `Title cannot be an empty field`,
      'string.min': `Title should have a minimum length of {#limit}`,
      'string.max': `Title should have a maximum length of {#limit}`,
      'any.required': `Title is a required field`,
    }),
  },
  overview: {
    value: Joi.string().min(10).max(2000).required().messages({
      'string.empty': `Overview cannot be an empty field`,
      'string.min': `Overview should have a minimum length of {#limit}`,
      'string.max': `Overview should have a maximum length of {#limit}`,
      'any.required': `Overview is a required field`,
    }),
  },
  runtime: {
    value: Joi.number().min(0).required().messages({
      'string.empty': `Runtime cannot be an empty field`,
      'string.min': `Runtime should have a minimum length of {#limit}`,
      'any.required': `Runtime is a required field`,
    }),
  },
};
