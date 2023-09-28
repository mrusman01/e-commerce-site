const express = require("express");
const jwt = require("jsonwebtoken");
const UserData = require("../model/user");

const auth = async (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).send({ message: "Token does not exist" });
  }

  try {
    jwt.verify(token, "secretkeyappearshere", async (err, userToken) => {
      if (err) {
        return res.status(504).json({ message: "Token Expired" });
      }

      const userEmail = userToken.email;

      try {
        const user = await UserData.findOne({ email: userEmail });

        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        req.user = user;

        next();
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = auth;
