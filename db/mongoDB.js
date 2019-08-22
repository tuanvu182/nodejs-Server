const mongoose = require("mongoose");
const keys = require("../keys/keys");
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
    console.log(e.message);
  }
};

module.exports = Db;
