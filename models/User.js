const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const keys = require("../config/keys");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 6
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    }
  },
  password: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isLength(value, { min: 6 })) {
        throw new Error("Password must have 6 characters or more");
      }
    }
  },
  tokens: [
    {
      token: {
        type: String,
        required: false
      }
    }
  ]
});

userSchema.methods.toJSON = function() {
  const userObj = this.toObject();
  delete userObj.tokens;
  delete userObj.password;
  return userObj;
};

userSchema.methods.genToken = async function() {
  const token = await jwt.sign({ _id: this._id.toString() }, keys.JWTSecret, {
    expiresIn: "1h"
  });
  this.tokens = this.tokens.concat({ token });
  await this.save();
  return token;
};

const User = mongoose.model("user", userSchema);

module.exports = User;
