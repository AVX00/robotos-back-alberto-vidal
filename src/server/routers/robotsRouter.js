const express = require("express");
const {
  getRobots,
  getRobot,
  createRobot,
  updateRobot,
  tokenValidator,
} = require("../controllers/robotsControllers");

const router = express.Router();

router.get("/", getRobots);

router.get("/:id", getRobot);

router.post("/create", tokenValidator, createRobot);

router.put("/update", tokenValidator, updateRobot);

module.exports = router;
