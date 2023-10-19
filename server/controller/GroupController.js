const UserData = require("../model/user");
const GroupModel = require("../model/groups");
const ChatModel = require("../model/chat");
const MemberGroups = require("../model/groupCreate");

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
//  create a new group personally

const createGroups = async (req, res) => {
  const { memberEmail, onwerId } = req.body;
  // console.log(memberEmail, onwerId, "----");

  try {
    const findUser = await UserData.findOne({ email: memberEmail });
    if (!findUser) {
      res.status(400).json({
        message: "user not found",
      });
    }
    let userData = {
      userId: findUser._id,
      name: findUser.name,
      email: findUser.email,
      avatar: findUser.avatar,
      role: findUser.roles,
    };
    const newGroup = new MemberGroups({
      onwerId: onwerId,
      groupName: findUser.name,
      addMembers: userData,
    });
    await newGroup.save();

    res.status(200).json({
      userMessage: newGroup,
      message: "Group created successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

const addMemberGroup = async (req, res) => {
  const { onwerId, memberEmail } = req.body;

  try {
    const findMember = await UserData.findOne({ email: memberEmail });

    if (!findMember) {
      res.status(400).json({
        message: "user not found",
      });
    }

    let userData = {
      userId: findMember._id,
      name: findMember.name,
      email: findMember.email,
      avatar: findMember.avatar,
      role: findMember.roles,
    };

    const addGroup = await MemberGroups.findOneAndUpdate(
      { onwerId: onwerId },
      { $push: { addMembers: userData } }
    );

    res.status(200).json({
      members: addGroup,
      message: "Member added successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

const sendMessage = async (req, res) => {
  const { text, onwerId, memberEmail } = req.body;
  // console.log(memberEmail, onwerId, text, "----");

  try {
    const addGroup = await MemberGroups.findOne({
      addMembers: { $elemMatch: { userId: onwerId } },
    });
    console.log(addGroup, "----");
    res.status(200).json({ message: addGroup });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  GroupChat,
  getMessages,
  createGroups,
  addMemberGroup,
  sendMessage,
};
