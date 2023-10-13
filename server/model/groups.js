const mongoose = require("mongoose");

const GroupChat = new mongoose.Schema({
  text: String,
  author: String,
  otherUsers: Array,
});

const GroupModel = mongoose.model("GroupChat", GroupChat);
module.exports = GroupModel;
