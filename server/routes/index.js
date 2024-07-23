const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  // res.sendFile(path.join(__dirname, "..", "views", "index.html"));
  res.json("Server is running");
});
module.exports = router;
