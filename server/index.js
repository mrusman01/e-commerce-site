const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
app.use(express.json());
app.use(cors());
const connectDb = require("./config/db");
require("dotenv").config({ path: "./.env" });

const port = process.env.PORT;
const UserRouter = require("./routes/userRoutes");
const ProductRoutes = require("./routes/productRoutes");
const PaymentRoute = require("./routes/paymentRoute");
const ChatRoutes = require("./routes/chatRoutes");
const GroupRoutes = require("./routes/groupRoutes");

connectDb();

app.use("/", UserRouter);
app.use("/", ProductRoutes);
app.use("/", PaymentRoute);
app.use("/", ChatRoutes);
app.use("/", GroupRoutes);

app.get("/", (req, res) => {
  res.status(200).send("Welcome to root URL of Server");
});

//frontend connect routed
app.use("/uploads", express.static("uploads"));
app.use(express.static(path.join(path.resolve(), "static")));
app.listen(port, (error) => {
  if (!error) console.log(`🚀🚀Example app listening on port ${port}`);
  else console.log("Error occurred, server can't start", error);
});
