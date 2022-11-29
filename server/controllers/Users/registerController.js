const Bcryptjs = require("../../config/bcrypt");
const UserModel = require("../../model/userModel");
const UserValidation = require("../../validation/userValidation");
require("dotenv").config();
const NodemailerJS = require("../../config/nodeMailer");
const logger = require("../../config/winston");

// Send Mail
function getMailForVerify(to) {
  return {
    from: process.env.AUTH_EMAIL,
    to: to,
    subject: "Confirmation your account",
    html: verifyUser(to),
  };
}

// The Mail With Link
function verifyUser(to) {
  return `<a href='http://localhost:3000/verify/email=${to}'> Please Click Here To Confirm Your Account </a>`;
}

const registerRequest = async (req, res) => {
  try {
    // Check Validation
    const requestUser = await UserValidation.registerSchema.validateAsync(
      req.body,
      { abortEarly: false }
    );

    // Hash Password
    requestUser.password = await Bcryptjs.createHash(requestUser.password);

    // Variable For Check If Email Existing
    const ifExistingEmail = await UserModel.findUserByEmail(requestUser.email);

    // Variable For Check If User Name Existing
    const ifExistingUserName = await UserModel.findUserByNickName(
      requestUser.nickName
    );

    // Check if Email Existing
    if (ifExistingEmail.length != 0) {
      throw "Email it's exist";
    }
    if (ifExistingUserName.length != 0) {
      throw "User Name it's exist";
    } else {
      let { email } = req.body;
      let options = getMailForVerify(email);
      NodemailerJS.transporter.sendMail(options, (err, info) => {
        if (err) {
          res.statusCode = 500;
          logger.fatal(err.message);
          res.json({ error: err.message });
        } else {
          res.statusCode = 200;
          res.json(info);
        }
      });

      await UserModel.createUser(
        requestUser.firstName,
        requestUser.lastName,
        requestUser.nickName,
        requestUser.phone,
        requestUser.dateOfBirth,
        requestUser.gender,
        requestUser.email,
        requestUser.photo,
        requestUser.password,
        requestUser.createdAt,
        requestUser.isAdmin,
        requestUser.block,
        requestUser.verify     
      );
    }

    res.json({
      status: 200,
      msg: "You've successfully registered",
      response: requestUser,
    });
  } catch (err) {
    res.status(400).json({ status: 400, err: err });
  }
};

module.exports = {
  registerRequest,
};
