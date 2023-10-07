const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  getAllUser,
  chatApplication,
  getMessages,
} = require("../controller/chatController");

router.get("/all-user", auth, getAllUser);
router.post("/chat-application", auth, chatApplication);
router.get("/chat-application/getMessages/:id/:autherId", auth, getMessages);

module.exports = router;
