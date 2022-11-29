const UserModel = require("../../../model/userModel");

const followRequest = async (req, res) => {
  try {
    const { nickName } = req.params;
    const user = await UserModel.findUserByNickName(nickName);
    const id = user[0].id;
    const myId = req.jwtData._id;
    const followers = user[0].followers;

    if (id !== myId) {
      followers.forEach((item) => {
        let stringId = item.toString();
        if (stringId === myId) {
          throw "you following after this user";
        }
      });
    } else {
      throw "you can't follow after your user";
    }
    await UserModel.receiveFollow(id, myId);
    await UserModel.sendFollow(myId, id);
    res.json({ msg: "New follow" });
  } catch (err) {
    res.status(400).json({ status: 400, err: err });
  }
};


module.exports = {
  followRequest,
};
