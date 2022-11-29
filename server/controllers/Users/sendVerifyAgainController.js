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

const sendVerifyRequest = async (req, res) => {

    try {
        const jwtUser = await UserModel.findUserByEmail(req.jwtData.email);

        const email = jwtUser[0].email;

        
        if(jwtUser[0].verify === false){
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

          res.json({
            status: 200,
            msg: "We send you mail with verify link ",
          });
        } else {
            throw "you user already verify";
        }

    } catch (err) {
       res.status(400).json({ status: 400, err: err });
    }
}

module.exports = {
  sendVerifyRequest,
};
