const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
app.use(express.json());
app.use(cors());
require("dotenv").config({ path: "./.env" });

const connectDb = require("./config/db");
const port = process.env.PORT;
const UserRouter = require("./routes/userRoutes");
connectDb();
app.use("/", UserRouter);
app.get("/", (req, res) => {
  res.status(200);
  res.send("Welcome to root URL of Server");
});

//frontend connect route
app.use("/uploads", express.static("uploads"));
app.use(express.static(path.join(path.resolve(), "static")));
app.listen(port, (error) => {
  if (!error) console.log(`🚀🚀Example app listening on port ${port}`);
  else console.log("Error occurred, server can't start", error);
});
