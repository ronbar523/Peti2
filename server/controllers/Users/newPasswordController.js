const UserModel = require("../../model/userModel");
require("dotenv").config();
const NodemailerJS = require("../../config/nodeMailer");
const Bcryptjs = require("../../config/bcrypt");
const UserValidation = require("../../validation/userValidation");
const logger = require("../../config/winston");
const Jwt = require("../../config/jwt");

// Send Mail
function getMailYourPasswordChange(to) {
  return {
    from: process.env.AUTH_EMAIL,
    to: to,
    subject: "Your password is changed",
    html: getUpdatePassword(),
  };
}

// The Mail
function getUpdatePassword() {
  return `<h1> Your Password is Changed </h1>`;
}

const newPasswordRequest = async (req, res) => {
  try {
    const validatedValue = await UserValidation.restAndPassSchema.validateAsync(
      { ...req.body, ...req.params },
      { abortEarly: false }
    );

    const user = await UserModel.findUserByEmail(validatedValue.email);

    if (user.length > 0) {
      if (user[0].block === false) {
        if (user[0].randomSecureNumber == validatedValue.num) {
          const nowDT = new Date();
          if (nowDT.getTime() <= user[0].dateSecureNumber.getTime()) {
            const hashPassword = await Bcryptjs.createHash(
              validatedValue.password
            );
            await UserModel.updatePassword(validatedValue.email, hashPassword);

            const token = await Jwt.createToken({
              email: user.email,
              verify: user.verify,
              nickName: user.nickName,
              _id: user[0]._id,
              isAdmin: user[0].isAdmin,
            });

            res.json({ msg: "password updated", token: token });

            let options = getMailYourPasswordChange(validatedValue.email);
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
          } else {
            throw "The Link It's Expired";
          }
        } else {
          throw "The random number it's wrong";
        }
      } else {
        throw "The user it's not exist";
      }
    } else {
      throw "The user it's block";
    }
  } catch (err) {
    res.status(400).json({ status: 400, err: err });
  }
};

module.exports = {
  newPasswordRequest,
};
