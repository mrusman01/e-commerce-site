const UserData = require("../model/user");
const ChatModel = require("../model/chat");

const getAllUser = async (req, res) => {
  let { _id } = req.user;
  try {
    const allUser = await UserData.find();
    const getData = {
      name: allUser,
    };
    res.status(200).json({
      user: allUser,
      message: "all user",
    });
  } catch (error) {
    console.log(error);
  }
};

const chatApplication = async (req, res) => {
  const { _id } = req.user;
  let { text, userId } = req.body;

  try {
    const chatData = new ChatModel({
      text: text,
      myId: _id,
      userId: userId,
    });

    await chatData.save();

    res.status(200).json({
      userMessage: chatData,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while saving the message",
    });
  }
};
const getMessages = async (req, res) => {
  const { _id } = req.user;
  let { id } = req.params;

  try {
    const findUser = await ChatModel.find({
      myId: _id,
      userId: id,
    });
    console.log(findUser, "======");
    res.status(200).json({
      userMessages: findUser,
      message: "get message successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllUser,
  chatApplication,
  getMessages,
};
