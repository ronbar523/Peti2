const PostModel = require("../../model/postModel");
const PostValidation = require("../../validation/postValidation");
const UserModel = require("../../model/userModel");


const deletePostRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await PostModel.findPostById(id);

    const jwtUser = await UserModel.findUserByEmail(req.jwtData.email);

    const userId = post.createdBy.toString();
    const createdById = jwtUser[0]._id.toString();

    if (userId === createdById || jwtUser[0].isAdmin === true) {
      await PostModel.deletePostById(id);
      res.json({ msg: "Post Deleted Successfully" });
    } else {
      throw "It's not your post and you are not the Admin";
    }
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

module.exports = {
  deletePostRequest,
};
