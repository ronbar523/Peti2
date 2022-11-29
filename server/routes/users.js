const express = require("express");
const router = express.Router();
const UserMiddleware = require("../middleware/userMiddleware");

const RegisterController = require("../controllers/Users/registerController");
const LoginController = require("../controllers/Users/loginController");
const VerifyController = require("../controllers/Users/verifyController");
const SendVerifyAgainController = require("../controllers/Users/sendVerifyAgainController");
const ResetPasswordController = require("../controllers/Users/resetPasswordController");
const NewPasswordController = require("../controllers/Users/NewPasswordController");
const FindUserController = require("../controllers/Users/findUserController");
const UpdateDetailsController = require("../controllers/Users/updateDetailsController");
const ChangePasswordController = require("../controllers/Users/changePasswordController");
const DeleteUserController = require("../controllers/Users/deleteUserController");
const SendFollowController = require("../controllers/Users/Follow/sendFollowController");
const RemoveFollowController = require("../controllers/Users/Follow/removeFollowController");


router.post("/register", RegisterController.registerRequest);

router.post("/login", LoginController.loginRequest);

router.post(
  "/send_verify_mail_again",
  UserMiddleware,
  SendVerifyAgainController.sendVerifyRequest
);

router.patch("/verify", VerifyController.verifyRequest);

router.post("/reset_password", ResetPasswordController.resetPasswordRequest);

router.patch(
  "/new_password/:email/:num",
  NewPasswordController.newPasswordRequest
);

router.get("/find_by_email", FindUserController.findUserByEmailRequest);

router.get(
  "/find_by_id",
  UserMiddleware,
  FindUserController.findUserByIdRequest
);

router.get(
  "/find_by_nick_name/:nickName",
  FindUserController.findUserByNickNameRequest
);

router.get("/find_all_users", FindUserController.findAllUsersRequest);



router.patch("/update", UserMiddleware, UpdateDetailsController.updateRequest);

router.patch(
  "/update_Password",
  UserMiddleware,
  ChangePasswordController.changePasswordRequest
);

router.delete(
  "/delete_my_user",
  UserMiddleware,
  DeleteUserController.deleteMyUserRequest
);

router.patch(
  "/follow/:nickName",
  UserMiddleware,
  SendFollowController.followRequest
);

router.patch(
  "/un_follow/:nickName",
  UserMiddleware,
  RemoveFollowController.unFollowRequest
);

module.exports = router;
