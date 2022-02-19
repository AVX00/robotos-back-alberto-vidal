const serverSays = require("debug")("robots:router:");
const express = require("express");
const { getRobots, getRobot } = require("../controllers/robotsControllers");

const router = express.Router();

router.get("/", getRobots);

router.get("/:id", getRobot);

module.exports = router;
