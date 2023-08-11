import Joi from "joi";

const registerSchema = Joi.object({
  userName: Joi.string().min(4).max(30).alphanum().required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  password: Joi.string().required().min(8).max(30),
  confirmPassword: Joi.any()
    .equal(Joi.ref("password"))
    .required()
    .label("Confirm password")
    .options({ messages: { "any.only": "{{#label}} does not match" } }),
});

const registrationValidation = (data) => {
  return registerSchema.validate(data);
};

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const loginValidation = (data) => {
  return loginSchema.validate(data);
};

const projectSchema = Joi.object({
  projectCategoryID: Joi.string().required(),
  projectCategoryName: Joi.string().required(),
  projectCategoryValue: Joi.string().required(),
  projectTitle: Joi.string()
    .required()
    .messages({ "string.empty": `Project name must contain value` }),
  createdBy: Joi.string(),
  updatedBy: Joi.string(),
  description: Joi.string(),
  userID: Joi.string().required(),
  status: Joi.string().required(),
  isActive: Joi.boolean().required(),
});

const porjectValidation = (data) => {
  return projectSchema.validate(data);
};

export { registrationValidation, loginValidation, porjectValidation };
