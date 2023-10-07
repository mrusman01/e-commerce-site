const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const upload = require("../middleware/multer");

const {
  AddProduct,
  ProductUpdate,
  GetAllProduct,
  ProductDelete,
  UserProducts,
} = require("../controller/productController");

router.post("/add-product", upload.single("avatar"), auth, AddProduct);
router.post("/product-update", upload.single("avatar"), ProductUpdate);
router.get(
  "/all-products/:category/:pages/:productsPerPages",
  auth,
  GetAllProduct
);
router.delete("/del-products/:id", ProductDelete);
router.get("/user-products", auth, UserProducts);

module.exports = router;
