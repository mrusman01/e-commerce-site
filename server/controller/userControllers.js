const UserData = require("../model/user");
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
    // if (!user.verified) {
    //   return res.status(400).send("verify your Email First");
    // }

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

module.exports = {
  SignUp,
  Login,
  AcccountVerify,
};
