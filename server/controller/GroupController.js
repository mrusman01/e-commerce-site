const UserData = require("../model/user");
const GroupModel = require("../model/groups");
const ChatModel = require("../model/chat");

// const AddUser = async (req, res) => {
//   const { email } = req.body;

//   try {
//     const find = await UserData.findOne({ email: email });
//     if (!find) {
//       return res.status(400).send({ message: "user is not exist" });
//     }
//     const findMember = await GroupModel.findOne({ email: email });
//     if (findMember) {
//       return res.status(400).send({ message: "already in group list" });
//     }
//     const add = new GroupModel({
//       email: email,
//     });
//     await add.save();

//     res
//       .status(200)
//       .json({ addUser: add, message: "user add in group successfully" });
//   } catch (error) {
//     console.log(error);
//   }
// };

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
  const { auther, otherUsers, text } = req.body;
  try {
    const allUser = await UserData.find();
    const getId = allUser.map((item) => item._id);

    const chatData = new GroupModel({
      text: text,
      auther: auther,
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
  let { autherId } = req.params;
  console.log(autherId);

  try {
    const allUser = await UserData.find();
    const getId = allUser.map((item) => item._id);

    const autherMsg = await GroupModel.find({
      auther: autherId,
      otherUsers: getId,
    });
    console.log(autherMsg, "autherrr");

    const findUser = await GroupModel.find({
      auther: { $ne: getId },
    });

    res.status(200).json({
      userMessages: autherMsg,
      otherUsersMsg: findUser,
      message: "get message successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  GroupChat,
  getMessages,
};
