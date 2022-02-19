const serverSays = require("debug")("robots:router:");
const express = require("express");
const { getRobots } = require("../controllers/robotsControllers");

const router = express.Router();

router.get("/", getRobots);

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  serverSays(`get at robots/${id}`);
});

module.exports = router;
