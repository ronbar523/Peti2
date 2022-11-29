const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  media: {
    type: String,
    required: true,
  },
  createdByName: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  like: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdAt: {
    type: Number,
    required: true,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  // comments: [{ body: "string", by: mongoose.Schema.Types.ObjectId }],
});

const Post = mongoose.model("posts", postSchema);

const createPost = (
    description,
    category,
    media,
    createdByName,
    date,
    like,
    createdAt,
    createdBy
) => {
    const newPost = new Post({
    description,
    category,
    media,
    createdByName,
    date,
    like,
    createdAt,
    createdBy
    })
    return newPost.save();
}

const findAllPosts = () => {
  return Post.find();
};

const findPostById = (id) => {
  return Post.findById(id);
}

const updatePost = (
  id,
  description 
) => {
  return Post.findByIdAndUpdate(id, description);
};

const updateUserDetailsInPost = (createdBy, { media, createdByName }) => {
  return Post.updateMany(
    { createdBy },
    { media, createdByName }
  );
};

const deletePostById = (id) => {
  return Post.findByIdAndDelete(id);
};


module.exports = {
  createPost,
  findAllPosts,
  findPostById,
  updatePost,
  updateUserDetailsInPost,
  deletePostById,
};