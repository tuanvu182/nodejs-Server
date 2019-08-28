const express = require("express");
const router = new express.Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");

// Test
router.get("/", (req, res) => {
  res.send("users");
});

// Create User - Public
router.post("/", async (req, res) => {
  try {
    // Check user name
    const isName = await User.findOne({ name: req.body.name });
    if (isName !== null) {
      throw new Error("Username has already been used!");
    }

    // Check user email
    const isEmail = await User.findOne({ email: req.body.email });
    if (isEmail !== null) {
      throw new Error("Email has already been used!");
    }

    // Make new user
    const user = new User(req.body);

    // Hash password
    const hashedPw = await bcrypt.hash(req.body.password, 10);
    user.password = hashedPw;
    await user.save();

    // Send Token
    const token = await user.genToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

// Login User - Public
router.post("/login", async (req, res) => {
  try {
    // Check email
    const user = await User.findOne({ email: req.body.email });
    if (user === null) {
      throw new Error("Email or password is not right");
    }

    // Check password
    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) {
      throw new Error("Email or password is not right");
    }

    // Send token
    const token = await user.genToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

// Auth User - Private
router.get("/auth", auth, (req, res) => {
  res.send(req.user);
});

// Logout User - Private
router.post("/logout", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

// Updates user - Private
router.patch("/current_user", auth, async (req, res) => {
  try {
    // Auth user and defines update element
    const updates = Object.keys(req.body);
    const allowUpdate = ["name", "email", "password"];
    const validUpdate = updates.every(update => allowUpdate.includes(update));
    if (!validUpdate) {
      throw new Error("Invalid updates");
    }

    // Change req user and update
    updates.forEach(update => {
      req.user[update] = req.body[update];
    });

    // Hash password
    if (req.body.password) {
      req.user.password = await bcrypt.hash(req.user.password, 10);
    }
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

// Delete user - Private
router.delete("/current_user", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send();
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

module.exports = router;
