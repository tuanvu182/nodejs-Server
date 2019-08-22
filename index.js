const express = require("express");
const Db = require("./db/mongoDB");
const path = require("path");

const app = express();

// Middleware to take Json from request body
app.use(express.json());

// Lauch Database
Db();

// Lauch Router
app.use("/api/users", require("./routes/api/users"));
app.use("/api/tasks", require("./routes/api/tasks"));

// Server in production setup
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
  // Get all routers
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Lauch Server
PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
