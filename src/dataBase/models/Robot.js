const { model, Schema } = require("mongoose");

const statsValidator = (stat) => stat >= 0 && stat <= 10;

const RobotSchema = new Schema({
  name: { type: String, required: true },
  img: { type: String, required: true },
  stats: {
    speed: { type: Number, required: true },
    resistance: { type: Number, required: true, validate: statsValidator },
    "fabrication-date": { type: Date, required: true },
  },
});

const Robot = model("Robot", RobotSchema, "robots");

module.exports = Robot;
