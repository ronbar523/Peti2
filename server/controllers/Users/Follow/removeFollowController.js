const UserModel = require("../../../model/userModel");

const unFollowRequest = async (req, res) => {
  try {
    const { nickName } = req.params;
    const user = await UserModel.findUserByNickName(nickName);
    const id = user[0].id;
    const myId = req.jwtData._id;
    const myUser = await UserModel.findUserById(myId);
    const following = myUser.following;
    let flag = false;

    if (id !== myId) {
      if(following.length > 0){
        following.forEach((item) => {
          const stringId = item.toString();
          if (stringId === id) {
            flag = true;
          }
        })
        if(!flag){
          throw "you not follow after this user"
        }
      } else {
        throw "you not follow after any user"
      } 
    } else {
      throw "you can't follow after your user";
    }
    await UserModel.unFollowers(id, myId);
    await UserModel.unFollowing(myId, id);
    res.json({ msg: "un follow" });
  } catch (err) {
    res.status(400).json({ status: 400, err: err });
  }
};

module.exports = {
  unFollowRequest,
};
