const express = require("express");
const {
  getRobots,
  getRobot,
  createRobot,
  updateRobot,
  deleteRobot,
} = require("../controllers/robotsControllers");
const tokenValidator = require("../middlewares/validators/tokenValidator");

const router = express.Router();

router.get("/:idRobot", getRobot);

router.get("/", getRobots);

router.post("/create", tokenValidator, createRobot);

router.put("/update", tokenValidator, updateRobot);

router.delete("/delete/:idRobot", tokenValidator, deleteRobot);

module.exports = router;
