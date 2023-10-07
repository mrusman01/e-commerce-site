const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const { PaymentStripe } = require("../controller/paymentController");

router.post("/create-checkout-session", auth, PaymentStripe);

module.exports = router;
