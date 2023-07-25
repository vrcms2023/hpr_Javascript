const Joi = require("joi")

const registerSchema = Joi.object({
    userName: Joi.string().min(4).max(30).alphanum().required(),
    email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),    
    password: Joi.string().required().min(8).max(30),
    confirmPassword: Joi.any().equal(Joi.ref('password')).required().label('Confirm password').options({ messages: { 'any.only': '{{#label}} does not match'} })
})

const registrationValidation = (data => {
    return registerSchema.validate(data);
})

const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
})

const loginValidation = (data => {
    return loginSchema.validate(data);
})

const projectSchema = Joi.object({
    projectTypeID: Joi.string().required(),
    projectTypeName: Joi.string().required(),
    projectTitle : Joi.string().required().messages({"string.empty": `Project name must contain value`,}),
    userName: Joi.string().required(),
    userID: Joi.string().required(),
    status : Joi.boolean().required()
})

const porjectValidation = data => {
    return projectSchema.validate(data)
}




module.exports = {
    registrationValidation: registrationValidation,
    loginValidation: loginValidation,
    porjectValidation: porjectValidation
}