const express = require("express");
const router = new express.Router();

// Test
router.get("/test", (req, res) => {
  res.send("Comments to be developed");
});

module.exports = router;
