const Joi = require('@hapi/joi');

const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    organization: Joi.string().min(3).required(),
    localHub: Joi.string().min(3).required(),
    loginDetails: Joi.object({
      email: Joi.string().min(6).required().email(),
      password: Joi.string().min(6).required(),
    }),
  });

  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(3).required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
