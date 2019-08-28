const express = require("express");
const router = new express.Router();

// Test
router.get("/", (req, res) => {
  res.send("comments");
});

module.exports = router;
