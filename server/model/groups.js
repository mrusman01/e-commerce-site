const mongoose = require("mongoose");

const GroupChat = new mongoose.Schema({
  text: String,
  auther: String,
  autherName: String,
  otherUsers: Array,
  // {timestamps: true,}
});

const GroupModel = mongoose.model("GroupChat", GroupChat);
module.exports = GroupModel;
