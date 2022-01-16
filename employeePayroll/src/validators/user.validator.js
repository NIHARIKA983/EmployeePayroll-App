import Joi from '@hapi/joi';

export const newUserValidator = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string()
        .min(3)
        .max(30)
        .required(),
    lastName: Joi.string()
        .min(3)
        .max(30)
        .required(),
    gender:Joi.string()
        .max(20)
        .required(),
    salary:Joi.number()
        .integer()
        .required(),
    department:Joi.string()
        .alphanum()
        .min(2)
        .max(20)
        .required(),
    emailId: Joi.string()
        .email()
        .required()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};
