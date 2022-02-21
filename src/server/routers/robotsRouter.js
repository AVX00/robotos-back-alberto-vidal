const express = require("express");
const {
  getRobots,
  getRobot,
  createRobot,
  updateRobot,
  deleteRobot,
} = require("../controllers/robotsControllers");
const auth = require("../middlewares/authenticators/auth");

const router = express.Router();

router.get("/:idRobot", getRobot);

router.get("/", getRobots);

router.post("/create", auth, createRobot);

router.put("/update", auth, updateRobot);

router.delete("/delete/:idRobot", auth, deleteRobot);

module.exports = router;
