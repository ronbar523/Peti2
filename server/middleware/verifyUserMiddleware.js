const Jwt = require("../config/jwt");
const UserModel = require("../model/userModel");

module.exports = async (req, res, next) => {
  try {
    // Check If Have a Token
    req.jwtData = await Jwt.verifyToken(req.headers.token);

    const jwtUser = await UserModel.findUserByEmail(req.jwtData.email);

    // Check If The User It's Biz Or Admin
    if (jwtUser[0].verify || jwtUser[0].isAdmin) {
      next();
    } else {
      throw "Your user it's not verify";
    }
  } catch (err) {
    res.status(401).json({ status: 401, msg: "you must verify your user" });
  }
};
