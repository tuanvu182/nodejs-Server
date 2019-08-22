const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const keys = require("../keys/keys");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
});

userSchema.methods.toJSON = function() {
  const userObj = this.toObject();

  delete userObj.password;
  delete userObj.tokens;

  return userObj;
};

userSchema.methods.genToken = async function() {
  const token = await jwt.sign({ id: this.id.toString() }, keys.JWTSecret);
  this.tokens = this.tokens.concat({ token });
  await this.save();
  return token;
};

const User = mongoose.model("user", userSchema);

module.exports = User;
