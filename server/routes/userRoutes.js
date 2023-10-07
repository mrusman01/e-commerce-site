const express = require("express");
const router = express.Router();

const { SignUp, Login } = require("../controller/userControllers");
const upload = require("../middleware/multer");

router.post("/register", upload.single("avatar"), SignUp);
router.post("/login", Login);

module.exports = router;
