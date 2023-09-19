const mongoose = require("mongoose");

const UserData = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  password: String,
  avatar: String,
  authCode: String,
  verified: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const UserSchema = mongoose.model("UserData", UserData);
module.exports = UserSchema;
