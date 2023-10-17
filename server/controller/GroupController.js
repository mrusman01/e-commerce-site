const UserData = require("../model/user");
const GroupModel = require("../model/groups");
const ChatModel = require("../model/chat");

const getAllUser = async (req, res) => {
  let { _id } = req.user;

  try {
    const allUser = await UserData.find();
    res.status(200).json({
      user: allUser,
      message: "all user",
    });
  } catch (error) {
    console.log(error);
  }
};

const GroupChat = async (req, res) => {
  const { auther, otherUsers, text, autherName } = req.body;
  try {
    const allUser = await UserData.find();
    const getId = allUser.map((item) => item._id);

    const chatData = new GroupModel({
      text: text,
      auther: auther,
      autherName: autherName,
      otherUsers: getId,
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
  // const { autherId } = req.params;

  try {
    const allMessages = await GroupModel.find();

    res.status(200).send({
      userMessage: allMessages,
      message: "get author  message",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  GroupChat,
  getMessages,
};
