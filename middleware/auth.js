const jwt = require("jsonwebtoken");
const User = require("../models/User");
const keys = require("../config/keys");

const auth = async (req, res, next) => {
  // Take token from browser
  try {
    let token = req.header("Authorization");
    if (token === undefined) {
      throw new Error("No token");
    }
    token = token.replace("Bearer ", "");
    // Check if user exist, and have a right token
    const decoded = jwt.verify(token, keys.JWTSecret);
    const user = await User.findOne({ id: decoded.id, "tokens.token": token });
    if (!user) {
      throw new Error("Token is invalid");
    }
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: e.message });
  }
};

module.exports = auth;
