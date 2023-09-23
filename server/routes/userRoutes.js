const express = require("express");
const {
  SignUp,
  Login,
  AddProduct,
  GetAllProduct,
  ProductUpdate,
  ProductDelete,
  UserProducts,
  PaymentStripe,
} = require("../controller/userController");
const upload = require("../middleware/multer");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/register", upload.single("avatar"), SignUp);
router.post("/login", Login);
router.post("/add-product", upload.single("avatar"), auth, AddProduct);
router.post("/product-update", upload.single("avatar"), ProductUpdate);
router.get(
  "/all-products/:category/:pages/:productsPerPages",
  auth,
  GetAllProduct
);
router.delete("/del-products/:id", ProductDelete);
router.get("/user-products", auth, UserProducts);
router.post("/create-checkout-session", auth, PaymentStripe);

module.exports = router;
