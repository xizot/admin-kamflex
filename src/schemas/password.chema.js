const Joi = require('joi');
const passwordschema = {
  value: Joi.string().min(8).required().messages({
    'string.base': `Password should be a type of 'text'`,
    'string.empty': `Password cannot be an empty field`,
    'any.required': `Password is a required field`,
    'string.min': 'Password must be longer than or equal to 8 characters',
  }),
};

const confirmpasswordSchema = {
  value: Joi.string().required().messages({
    'string.empty': `Retype password cannot be an empty field`,
  }),
};

export { passwordschema, confirmpasswordSchema };
