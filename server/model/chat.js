const mongoose = require("mongoose");

const Chat = new mongoose.Schema({
  text: String,
  myId: String,
  userId: String,
});

const ChatModel = mongoose.model("Chat", Chat);
module.exports = ChatModel;
