const PostModel = require("../../model/postModel");
const PostValidation = require("../../validation/postValidation");
const UserModel = require("../../model/userModel");



const updatePostRequest = async (req, res) => {
    try {
      const { id } = req.params 

      const post = await PostModel.findPostById(id);

      const requestPost = await PostValidation.updatePostSchema.validateAsync(
        req.body,
        { abortEarly: false }
      );
      
      const jwtUser = await UserModel.findUserByEmail(req.jwtData.email);
      
      const userIdInPost = post.createdBy.toString();
      
      const userId = jwtUser[0]._id.toString();

      if (userId === userIdInPost || jwtUser[0].isAdmin === true) {
        await PostModel.updatePost(post._id, requestPost);
        res.json({ msg: "Post updated successfully" });
      } else {
        throw "It's not your Post and you are not the Admin";
      }
    } catch (err) {
      res.status(400).json({ err: err });
    }
};

module.exports = {
  updatePostRequest,
};