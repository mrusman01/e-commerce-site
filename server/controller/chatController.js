const UserData = require("../model/user");
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

const chatApplication = async (req, res) => {
  const { auther, anotherUser, text } = req.body;

  try {
    const chatData = new ChatModel({
      text: text,
      auther: auther,
      anotherUser: anotherUser,
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
  let { id, autherId } = req.params;

  try {
    const findUser1 = await ChatModel.find({
      auther: autherId,
      anotherUser: id,
    });
    const findUser = await ChatModel.find({
      auther: id,
      anotherUser: autherId,
    });

    // if (!findUser) {
    //   findUser = await ChatModel.find({
    //     auther: id,
    //     anotherUser: autherId,
    //   });
    // }

    // console.log(findUser1, "----");
    // console.log(findUser, "----222222222");
    res.status(200).json({
      userMessages: findUser1,
      userMessagesAnother: findUser,
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
