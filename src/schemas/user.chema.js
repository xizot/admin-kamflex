const Joi = require('joi');
const usernameSchema = {
  value: Joi.string().min(3).max(32).required().messages({
    'string.base': `Username should be a type of 'text' or email`,
    'string.empty': `Username cannot be an empty field`,
    'string.min': `Username should have a minimum length of {#limit}`,
    'string.max': `Username should have a maximum length of {#limit}`,
    'any.required': `Username is a required field`,
  }),
};

const emailSchema = {
  value: Joi.string()
    .max(320)
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': `Email cannot be an empty field`,
      'string.max': `Email should have a maximum length of {#limit}`,
      'any.required': `Email is a required field`,
    }),
};

export { usernameSchema, emailSchema };
