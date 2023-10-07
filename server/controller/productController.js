const ProductSchema = require("../model/product");

const AddProduct = async (req, res) => {
  const { _id } = req.user;

  let { title, description, price, rating, quantity, categories } = req.body;
  const fileName = req.file.filename;

  try {
    let productAdd = new ProductSchema({
      title: title,
      description: description,
      price: price,
      avatar: fileName,
      rating: rating,
      categories: categories,
      quantity: quantity,
      user: _id,
    });

    await productAdd.save();

    res.status(200).json({
      success: true,
      message: "Product add successfully",
      product: {
        title: req.body?.title,
        description: req.body?.description,
        price: req.body?.price,
        rating: req.body?.rating,
        avatar: req.body?.fileName,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const GetAllProduct = async (req, res) => {
  const { category } = req.params;
  const pages = parseInt(req.params.pages);
  const productsPerPage = parseInt(req.params.productsPerPages);
  const { _id } = req.user;
  try {
    const totalProducts = await ProductSchema.countDocuments({
      user: { $ne: _id },
      categories:
        category === "item" ? { $in: ["food", "phone", "clothes"] } : category,
    });

    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const getProducts = await ProductSchema.find({
      user: { $ne: _id },
      categories:
        category === "item" ? { $in: ["food", "phone", "clothes"] } : category,
    })
      .skip((pages - 1) * productsPerPage)
      .limit(productsPerPage);

    res.status(200).json({
      message: "All products get successfully",
      products: getProducts,
      currentPage: pages,
      totalPages: totalPages,
      totalProducts: totalProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const ProductUpdate = async (req, res) => {
  const update = {
    title: req.body?.title,
    description: req.body?.description,
    price: req.body?.price,
    avatar: req.body?.avatar,
  };
  try {
    let updatedProduct = await ProductSchema.findByIdAndUpdate(
      req.user._id,
      update
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const ProductDelete = async (req, res) => {
  const { id } = req.params;
  try {
    let productDel = await ProductSchema.findOneAndDelete(id);

    if (!productDel) {
      return res
        .status(404)
        .json({ message: "Product is not found or already deleted" });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      // product: productDel,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const UserProducts = async (req, res) => {
  let { _id } = req.user;
  try {
    const getUserProducts = await ProductSchema.find({
      user: { $eq: _id },
    });

    if (!getUserProducts) {
      return res.status(400).send({ message: "not aviliabe" });
    }
    return res.status(200).json({
      success: true,
      message: "Product fetch successfully",
      products: getUserProducts,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  AddProduct,
  ProductUpdate,
  GetAllProduct,
  ProductDelete,
  UserProducts,
};
