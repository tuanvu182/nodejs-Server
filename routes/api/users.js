const express = require("express");
const router = new express.Router();
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const auth = require("../../middleware/auth");

router.get("/", (req, res) => {
  res.send("Users");
});

// AUTH CHECK - PRIVATE
router.post("/auth", auth, (req, res) => {
  const user = req.user;
  res.send(user);
});

// SIGNUP USER - Public
router.post(
  "/",
  [
    check("email", "Invalid email").isEmail(),
    check("password", "Password must have at least 6 characters").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    // Validation result
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Take keys from request body object
    const { email, password } = req.body;

    try {
      // Check User in DB
      const isExist = await User.findOne({ email });
      if (isExist) {
        throw new Error("User already exist");
      }

      // Make new User
      const user = new User({ email, password });

      // Hash Password
      user.password = await bcrypt.hash(password, 10);
      await user.save();

      // Send Token using object methods in mongoose modal
      const token = await user.genToken();
      res.send({ user, token });
    } catch (e) {
      res.status(400).json({ errors: [{ msg: e.message }] });
    }
  }
);

// LOGIN USER - Public
router.post("/login", async (req, res) => {
  try {
    // Check email and password
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Please provide a valid username and password");
    }

    const passCheck = await bcrypt.compare(password, user.password);
    if (!passCheck) {
      throw new Error("Please provide a valid username and password");
    }

    // Send token
    const token = await user.genToken();
    res.send({ user, token });
  } catch (e) {
    res.status(404).json({ errors: [{ msg: e.message }] });
  }
});

// LOGOUT USER - Private
router.post("/logout", auth, async (req, res) => {
  try {
    //remove all tokens
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.json({ errors: [{ msg: e.message }] });
  }
});

// MODIFY USER - Private
router.put(
  "/current_user",
  auth,
  [
    check("password", "Password must have at least 6 characters").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { password } = req.body;

    try {
      req.user.password = await bcrypt.hash(password, 10);
      await req.user.save();
      res.send(req.user);
    } catch (e) {
      res.status(500).json({ errors: [{ msg: e.message }] });
    }
  }
);

// DELETE USER - Private
router.delete("/current_user", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(500).json({ errors: [{ msg: e.message }] });
  }
});

module.exports = router;
