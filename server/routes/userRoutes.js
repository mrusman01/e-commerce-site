const express = require("express");
const {
  SignUp,
  Login,
  AddProduct,
  GetAllProduct,
  ProductUpdate,
  ProductDelete,
} = require("../controller/userController");
const upload = require("../middleware/multer");

const router = express.Router();

router.post("/register", upload.single("avatar"), SignUp);
router.post("/login", Login);
router.post("/add-product", upload.single("avatar"), AddProduct);
router.post("/product-update", upload.single("avatar"), ProductUpdate);
router.get("/all-products/:category", GetAllProduct);
router.delete("/del-products", ProductDelete);

module.exports = router;
