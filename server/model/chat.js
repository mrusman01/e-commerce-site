const mongoose = require("mongoose");

const Chat = new mongoose.Schema({
  text: String,
  auther: String,
  anotherUser: String,
});

const ChatModel = mongoose.model("Chat", Chat);
module.exports = ChatModel;
