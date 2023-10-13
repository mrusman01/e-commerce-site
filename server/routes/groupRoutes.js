const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const { GroupChat, getMessages } = require("../controller/GroupController");
router.post("/group-chat", auth, GroupChat);
router.get("/getMessages-chat/:id", auth, getMessages);

module.exports = router;
