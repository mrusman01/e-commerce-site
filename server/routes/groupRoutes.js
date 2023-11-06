const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  GroupChat,
  getMessages,
  createGroups,
  addMemberGroup,
  sendMessage,
  getUserMessages,
  allGroups,
  allGroupMembers,
  getMemberMessages,
} = require("../controller/GroupController");
router.post("/group-chat", auth, GroupChat);
router.get("/getMessages-chat/:autherId", auth, getMessages);
router.post("/createMemberGroups", auth, createGroups);
router.post("/addMemberGroup", auth, addMemberGroup);
router.post("/sendMessageInGroup", auth, sendMessage);
router.get("/allGroups", auth, allGroups);
router.get("/getUserMessages/:onwerId", auth, getUserMessages);
router.get("/allGroupMembers/:id", auth, allGroupMembers);
router.get("/getMemberMessages/:id", auth, getMemberMessages);

module.exports = router;
