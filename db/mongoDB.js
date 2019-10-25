const mongoose = require("mongoose");
const keys = require("../config/keys");
const Db = async () => {
    try {
      await mongoose.connect(
        keys.mongooseURI,
        { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true  }
      )
      console.log("Connected to the DB...")
    } catch (e) {
      console.log("Cannot connect to the DB");
      process.exit(1);
    }

};

module.exports = Db;
