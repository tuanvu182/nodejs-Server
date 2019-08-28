const express = require("express");
const router = new express.Router();

const auth = require("../../middleware/auth");
const Post = require("../../models/Post");

// Get all posts - Public
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ dateCreated: -1 });
    res.send(posts);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

// Get post - Private
router.get("/current_user", auth, async (req, res) => {
  try {
    const _id = req.user.id;
    const posts = await Post.find({ authorId: _id }).sort({ dateCreated: -1 });
    res.send(posts);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

// Make post - Private
router.post("/", auth, async (req, res) => {
  try {
    const post = await new Post(req.body);
    post.authorId = req.user.id;
    post.authorName = req.user.name;
    await post.save();
    res.status(201).send(post);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

// Edit Post - Private
router.patch("/:id", auth, async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowUpdate = ["title", "content", "date"];
    const validUpdate = updates.every(update => allowUpdate.includes(update));
    if (!validUpdate) {
      throw new Error("Invalid updates");
    }
    const post = await Post.findOne({
      _id: req.params.id,
      authorId: req.user.id
    });
    if (post === null) {
      throw new Error("Cannot edit an unauthorized post or do not exist");
    }
    updates.forEach(update => {
      post[update] = req.body[update];
    });
    await post.save();
    res.send(post);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

// Delete Post - Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findOne({
      _id: req.params.id,
      authorId: req.user.id
    });
    if (post === null) {
      throw new Error("Cannot delete an unauthorized post or do not exist");
    }
    await post.remove();
    res.send();
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

module.exports = router;
