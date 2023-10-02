const mongoose = require("mongoose");
const connectDatabase = () => {
  const db = process.env.DB;

  mongoose
    .connect(db)
    .then(() => {
      console.log(`🚀🚀 MongoDB Connected succesfully------ `);
    });
};

module.exports = connectDatabase;
