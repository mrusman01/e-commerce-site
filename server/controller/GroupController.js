const UserData = require("../model/user");
const GroupModel = require("../model/groups");
const ChatModel = require("../model/chat");
const MemberGroups = require("../model/groupCreate");

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

  try {
    const findUser = await UserData.findOne({ email: memberEmail.user });
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
      groupName: memberEmail.groupName,
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

const allGroups = async (req, res) => {
  try {
    const groups = await MemberGroups.find();
    console.log(groups);
    res.status(200).send({ allGroups: groups, message: "all groups found" });
  } catch (error) {
    console.log(error);
  }
};

const allGroupMembers = async (req, res) => {
  const { id } = req.params;

  try {
    const memberData = await MemberGroups.find({ _id: id });

    if (memberData.length === 0) {
      return res.status(404).send({ message: "Group not found" });
    }

    const memberArray = memberData.map((item) => item.addMembers);

    res.status(200).json({ messages: memberArray, message: "All members" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

const getMemberMessages = async (req, res) => {
  const { id } = req.params;

  try {
    const memberData = await MemberGroups.find({ _id: id });
    console.log(memberData);

    if (memberData.length === 0) {
      return res.status(404).send({ message: "Group not found" });
    }

    const membersMsg = memberData.map((item) => item.messages);

    // console.log(membersMsg, "====");

    res.status(200).json({ messages: membersMsg, message: "All messages" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

const addMemberGroup = async (req, res) => {
  const { onwerId, memberEmail, _id } = req.body;
  console.log("idddd", _id);

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
      { _id: _id },
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
  const { text, onwerId, name, _id } = req.body;

  try {
    const addGroup = await MemberGroups.find({
      "addMembers.userId": onwerId,
    });
    console.log(addGroup, "----");

    if (!addGroup) {
      res.status(400).send({ message: "memeber is not found" });
    }
    const userMessages = {
      memberId: onwerId,
      text: text,
      name: name,
    };

    console.log(userMessages.memberId, "----user messages input");

    const messages = await MemberGroups.findOneAndUpdate(
      { _id: _id },
      { $push: { messages: userMessages } }
    );

    console.log(messages, "----user messages inputdata find one and update");

    res.status(200).json({
      membersMsg: messages,
      messages: "member messages send ",
    });
  } catch (error) {
    console.log(error);
  }
};

const getUserMessages = async (req, res) => {
  const { onwerId } = req.params;
  try {
    const findMember = await MemberGroups.find({
      "addMembers.userId": onwerId,
    });

    if (findMember.length === 0) {
      return res.status(404).json({ message: "Member not found" });
    }

    const messagesData = await MemberGroups.find();

    const messagesArray = messagesData.map((item) => item.messages);

    res
      .status(200)
      .json({ messages: messagesArray, message: "Member messages retrieved" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching messages" });
  }
};

module.exports = {
  GroupChat,
  getMessages,
  createGroups,
  addMemberGroup,
  allGroups,
  sendMessage,
  getUserMessages,
  allGroupMembers,
  getMemberMessages,
};
