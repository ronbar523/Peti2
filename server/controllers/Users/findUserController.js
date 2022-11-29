const UserModel = require("../../model/userModel");

// Find User By Email
const findUserByEmailRequest = async (req, res) => {
  try {
    const { email } = req.query;
    const user = await UserModel.findUserByEmail(email);
    res.json(user);
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

// Find User By ID
const findUserByIdRequest = async (req, res) => {
  try {
    const user = await UserModel.findUserById(req.jwtData._id);
    res.json(user);
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

// Find User By Nick Name
const findUserByNickNameRequest = async (req, res) => {
  try {
    const { nickName } = req.params
    const user = await UserModel.findUserByNickName(nickName);
    res.json(user);
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

const findAllUsersRequest = async (req, res ) => {
  try {
    const userArr = await UserModel.findAllUser();
    res.json(userArr);
  } catch (err) {
    res.status(400).json({ err: err });
  }
}



module.exports = {
  findUserByEmailRequest,
  findUserByIdRequest,
  findUserByNickNameRequest,
  findAllUsersRequest,
};
