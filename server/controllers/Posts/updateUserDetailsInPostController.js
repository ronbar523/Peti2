const PostModel = require("../../model/postModel");
const PostValidation = require("../../validation/postValidation");
const UserModel = require("../../model/userModel");

const updateUserDetailsInPostRequest = async (req, res) => {

    try {
      const createdById = req.jwtData._id;
      const requestPost =
        await PostValidation.updateUserDetailsInPostSchema.validateAsync(
          req.body,
          { abortEarly: false }
        );

      await PostModel.updateUserDetailsInPost(createdById, requestPost);
      res.json({ msg: "User details in Post updated successfully" });
    } catch (err) {
      res.status(400).json({ err: err });
    }

}



module.exports = {
  updateUserDetailsInPostRequest,
};