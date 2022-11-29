const joi = require("joi");

const descriptionRole = {
  description: joi.string().min(1).max(1024).required(),
};

const categoryRole = {
  category: joi.string().min(1).max(25).required(),
};

const mediaRole = {
  media: joi.string().required(),
};

const createdByNameRole = {
  createdByName: joi.string().required(),
};

const dateRole = {
  date: joi.string().required(),
};


const postRole = {
  ...descriptionRole,
  ...categoryRole,
  ...mediaRole,
  ...createdByNameRole,
  ...dateRole,
};

const updatePostRole = {
  ...descriptionRole,
};

const updateUserDetailsInPostRole = {
  // ...mediaRole,
  ...createdByNameRole,
};



const postSchema = joi.object(postRole);
const updatePostSchema = joi.object(updatePostRole);
const updateUserDetailsInPostSchema = joi.object(updateUserDetailsInPostRole);




module.exports = {
  postSchema,
  updatePostSchema,
  updateUserDetailsInPostSchema,
};