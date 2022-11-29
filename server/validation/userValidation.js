const joi = require("joi");

const emailRole = {
  email: joi
    .string()
    .email({
      minDomainSegments: 2,
    })
    .trim()
    .required()
    .messages({
      "any.required": "please input a valid Email",
      "string.email": "please use mail",
    }),
};

const userNameRole = {
  nickName: joi.string().min(4).max(20).trim().required().messages({
    "any.required": "please input a valid User Name",
    "string.nickName":
      "please use User Name with minimum 4 characters and maximum 20 characters",
  }),
};

const passwordRole = {
  password: joi
    .string()
    .regex(
      new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%&]).{6,30}$")
    )
    .required()
    .messages({
      "any.required": "please input a valid Password",
      "string.password":
        "please use password with minimum 6 characters and maximum 30 characters And use at least one sign, one number, one uppercase letter, and one lowercase letter",
    }),
};

const booleanOptionsRole = {
  block: joi.boolean(),
  isAdmin: joi.boolean(),
  verify: joi.boolean(),
};

const kindUserRole = {
  firstName: joi.string().min(1).max(15).required(),
  lastName: joi.string().min(1).max(15).required(),
  phone: joi.string(),
  dateOfBirth: joi.string().required(),
  gender: joi.string().min(4).max(11).required(),
  photo: joi.string(),
};


const secretNum = {
  num: joi.number().min(100_000).max(999_999).required(),
};


const registerSkeleton = {
  ...emailRole,
  ...userNameRole,
  ...passwordRole,
  ...booleanOptionsRole,
  ...kindUserRole,
};

const loginSkeleton = {
  ...emailRole,
  ...passwordRole,
};

const emailSkeleton = {
  ...emailRole,
};

const newEmailSkeleton = {
  ...emailRole,
};

const restAndNewPasswordSkeleton = {
  ...emailRole,
  ...passwordRole,
  ...secretNum,
};

const newPasswordSkeleton = {
  ...passwordRole,
};

const updateDetailsSkeleton = {
  ...kindUserRole,
};

const registerSchema = joi.object(registerSkeleton);
const loginSchema = joi.object(loginSkeleton);
const emailSchema = joi.object(emailSkeleton);
const newEmailSchema = joi.object(newEmailSkeleton);
const newPassSchema = joi.object(newPasswordSkeleton);
const restAndPassSchema = joi.object(restAndNewPasswordSkeleton);
const updateDetailsSchema = joi.object(updateDetailsSkeleton);

module.exports = {
  registerSchema,
  loginSchema,
  emailSchema,
  newEmailSchema,
  newPassSchema,
  restAndPassSchema,
  updateDetailsSchema,
};
