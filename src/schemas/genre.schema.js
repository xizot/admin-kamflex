const Joi = require('joi');
const genreSchema = {
  value: Joi.string().required().messages({
    'string.empty': `Genre name cannot be an empty field`,
    'any.required': `Genre name is a required field`,
  }),
};
const countrySchema = {
  value: Joi.string().required().messages({
    'string.empty': `Country cannot be an empty field`,
    'any.required': `Country is a required field`,
  }),
};

export { genreSchema, countrySchema };
