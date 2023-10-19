const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  GroupChat,
  getMessages,
  createGroups,
  addMemberGroup,
  sendMessage,
} = require("../controller/GroupController");
router.post("/group-chat", auth, GroupChat);
router.get("/getMessages-chat/:autherId", auth, getMessages);
router.post("/createMemberGroups", auth, createGroups);
router.post("/addMemberGroup", auth, addMemberGroup);
router.post("/sendMessageInGroup", auth, sendMessage);

module.exports = router;
