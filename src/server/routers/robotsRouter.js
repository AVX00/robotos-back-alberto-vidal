const serverSays = require("debug")("robots:router:");
const express = require("express");
const {
  getRobots,
  getRobot,
  createRobot,
} = require("../controllers/robotsControllers");

const router = express.Router();

router.get("/", getRobots);

router.get("/:id", getRobot);

router.post("/create", createRobot);

module.exports = router;
