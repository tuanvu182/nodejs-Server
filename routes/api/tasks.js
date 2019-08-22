const express = require("express");
const router = new express.Router();
const auth = require("../../middleware/auth");
const Task = require("../../models/Task");

// MAKE TASK - PRIVATE
router.post("/", auth, async (req, res) => {
  try {
    const { title } = req.body;
    const task = await new Task({
      title,
      owner: req.user.id
    });
    await task.save();
    res.send(task);
  } catch (e) {
    res.status(500).json({ errors: [{ msg: e.message }] });
  }
});

// GET TASKS - PRIVATE
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ owner: req.user.id });
    res.send(tasks);
  } catch (e) {
    res.status(500).json({ errors: [{ msg: e.message }] });
  }
});

// GET SINGLE TASK - PRIVATE
router.get("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOne({
      owner: req.user.id,
      _id: req.params.id
    });
    if (task.length === 0) {
      throw new Error("Cannot get task that do not exist");
    }
    res.send(task);
  } catch (e) {
    res.status(500).json({ errors: [{ msg: e.message }] });
  }
});

// EDIT TASK - PRIVATE
router.put("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOne({
      owner: req.user.id,
      _id: req.params.id
    });
    if (task.length === 0) {
      throw new Error("Cannot edit a task that do not exist");
    }

    const { title } = req.body;
    task.title = title;
    task.save();

    res.send(Task);
  } catch (e) {
    res.status(500).json({ errors: [{ msg: e.message }] });
  }
});

// DELETE TASK - PRIVATE
router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOne({
      owner: req.user.id,
      _id: req.params.id
    });
    if (task.length === 0) {
      throw new Error("Cannot delete a Task that not exist");
    }
    await task.remove();
    res.send(task);
  } catch (e) {
    res.status(500).json({ errors: [{ msg: e.message }] });
  }
});

module.exports = router;
