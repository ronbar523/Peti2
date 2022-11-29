const express = require("express");
const router = express.Router();
const VerifyUserMiddleware = require("../middleware/verifyUserMiddleware");
const UserMiddleware = require("../middleware/userMiddleware");

const CreatePostController = require("../controllers/Posts/createPostController");
const FindPostController = require("../controllers/Posts/findController");
const UpdatePostController = require("../controllers/Posts/updatePostController");
const updateUserDetailsInPostController = require("../controllers/Posts/updateUserDetailsInPostController");
const DeletePostController = require("../controllers/Posts/deletePostController");




router.post("/create_post", VerifyUserMiddleware, CreatePostController.createPostRequest);

router.get("/find_all_posts", FindPostController.findAllPostRequest);

router.patch("/update_post/:id", UserMiddleware, UpdatePostController.updatePostRequest);

router.patch("/update_user_details_in_post", UserMiddleware, updateUserDetailsInPostController.updateUserDetailsInPostRequest);

router.delete("/delete_post/:id", VerifyUserMiddleware, DeletePostController.deletePostRequest);








module.exports = router;