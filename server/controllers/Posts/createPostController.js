const PostModel = require("../../model/postModel");
const UserModel = require("../../model/userModel");
const PostValidation = require("../../validation/postValidation");

const createPostRequest = async (req, res) => {
  try {
    console.log("f")
    const requestPost = await PostValidation.postSchema.validateAsync(
      req.body,
      {
        abortEarly: false,
      }
    );

    console.log(requestPost);

    const jwtUser = await UserModel.findUserByEmail(req.jwtData.email);

    await PostModel.createPost(
      requestPost.description,
      requestPost.category,
      requestPost.media,
      requestPost.createdByName,
      requestPost.date,
      requestPost.like,
      requestPost.createdAt,
      jwtUser[0].id
    );

    console.log('s');

    res.json({ status: 200, msg: "work", response: requestPost });
  } catch (err) {
    res.status(400).json({ status: 400, err: err });
  }
};

module.exports = {
  createPostRequest,
};
