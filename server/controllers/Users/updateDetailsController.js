const UserModel = require("../../model/userModel");
const UserValidation = require("../../validation/userValidation");

const updateRequest = async (req, res) => {
  try {
    const user = await UserModel.findUserByEmail(req.jwtData.email);

    const email = user[0].email;

    const requestUserDetails =
      await UserValidation.updateDetailsSchema.validateAsync(req.body, {
        abortEarly: false,
      });
    
    await UserModel.updateDetails(email, requestUserDetails);
    res.json({ msg: "User details updated successfully" });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

module.exports = {
  updateRequest,
};
