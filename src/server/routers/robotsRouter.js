const express = require("express");
const {
  getRobots,
  getRobot,
  createRobot,
  updateRobot,
} = require("../controllers/robotsControllers");
const tokenValidator = require("../middlewares/validators/tokenValidator");

const router = express.Router();

router.get("/", getRobots);

router.get("/:id", getRobot);

router.post("/create", tokenValidator, createRobot);

router.put("/update", tokenValidator, updateRobot);

module.exports = router;
