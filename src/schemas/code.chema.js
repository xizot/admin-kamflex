const Joi = require('joi');
const recoveryCodeSchema = {
  value: Joi.string().required().messages({
    'string.empty': `"recoveryCode" cannot be an empty field`,
    'any.required': `"recoveryCode" is a required field`,
  }),
};

const verifyCodeSchema = {
  value: Joi.string().required().messages({
    'string.empty': `"recoveryCode" cannot be an empty field`,
    'any.required': `"recoveryCode" is a required field`,
  }),
};

export { recoveryCodeSchema, verifyCodeSchema };
