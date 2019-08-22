const jwt = require("jsonwebtoken");
const User = require("../models/User");
const keys = require("../keys/keys");

const auth = async (req, res, next) => {
  // Take token from browser
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      throw new Error("No token");
    }

    // Check if user exist, and have a right token
    const decoded = jwt.verify(token, keys.JWTSecret);
    const user = await User.findOne({ _id: decoded.id, "tokens.token": token });
    if (!user) {
      throw new Error("Token is invalid");
    }
    req.user = user;
    next();
  } catch (e) {
    res.status(401).json({ errors: [{ msg: e.message }] });
  }
};

module.exports = auth;
