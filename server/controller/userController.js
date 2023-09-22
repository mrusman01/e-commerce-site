const UserData = require("../model/user");
const ProductSchema = require("../model/product");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const generateRandomCode = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
const verifyCode = generateRandomCode();
const sendEmail = () => {
  try {
    const mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailDetails = {
      from: process.env.EMAIL_USER,
      to: process.env.TO,
      subject: "Verification code",
      text: `Your verification code is: ${verifyCode}`,
    };
    mailTransporter.sendMail(mailDetails, function (err, data) {
      if (err) {
        console.log("Error Occurs");
      } else {
        console.log("🚀Email sent successfully");
      }
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const SignUp = async (req, res) => {
  let { name, email, phone, password } = req.body;
  const bcryptPass = await bcrypt.hash(password, 8);
  try {
    const userFind = await UserData.findOne({ email: email });
    if (userFind) {
      return res.status(401).send({ message: "user is already exists" });
    }

    const fileName = req.file.filename;
    const data = new UserData({
      name: name,
      password: bcryptPass,
      phone: phone,
      email: email,
      avatar: fileName,
      authCode: verifyCode,
    });

    await data.save();
    sendEmail();
    res.status(200).json({ message: "Register Successfully" });
  } catch (error) {
    console.log(error);
  }
};

const Login = async (req, res) => {
  let { email, password } = req.body;
  try {
    const user = await UserData.findOne({ email: email });
    if (!user) {
      return res.status(400).send("User not found --");
    }

    let validPassword = bcrypt.compareSync(
      password,
      user.password,
      (err, result) => {
        if (err) console.log(err);
      }
    );

    if (!validPassword) {
      console.log("Invalid Password!!!!");
      return res.status(401).send({ message: "Invalid Password!" });
    }

    let token = jwt.sign({ email }, "secretkeyappearshere", {
      expiresIn: "2h",
    });

    if (UserData.isVerify === false) {
      return res.status(400).json({ message: "please your account" });
    }
    res.status(200).json({
      success: true,
      token: token,
      message: "Login Successfully",
      user: user,
    });
  } catch (error) {
    console.log(error);
  }
};

// account verify

const AcccountVerify = async (req, res) => {
  const { authCode } = req.body;

  try {
    let user = await UserData.findOne({
      authCode: authCode,
    });
    if (!user) {
      return res.status(400).send({ message: "verify code  is not correct" });
    }
    // user.varificationCode = undefined;
    await user.save();

    return res.status(200).send({ message: "verified User" });
  } catch (error) {
    console.log(error);
  }
};

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
    const userData = await UserData.findOne(_id);
    console.log(userData, "=====");
    if (!userData) {
      return res.status(400).send({ message: "not aviliabe" });
    }
    return res.status(200).json({
      success: true,
      message: "successfull",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  SignUp,
  Login,
  AcccountVerify,
  AddProduct,
  ProductUpdate,
  GetAllProduct,
  ProductDelete,
  UserProducts,
};
