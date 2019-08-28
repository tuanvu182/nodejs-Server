const mongoose = require("mongoose");
const keys = require("../config/keys");
const Db = async () => {
  try {
    await mongoose.connect(
      keys.mongooseURI,
      { useNewUrlParser: true, useCreateIndex: true },
      () => {
        console.log("Connected to the DB...");
      }
    );
  } catch (e) {
    throw new Error("Cannot connect to the DB!");
  }
};

module.exports = Db;
