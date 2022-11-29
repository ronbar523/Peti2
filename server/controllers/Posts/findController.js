const PostModel = require("../../model/postModel");


const findAllPostRequest = async (req, res) => {
  try {
    const postArr = await PostModel.findAllPosts();
    res.json(postArr);
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

module.exports = {
  findAllPostRequest,
};