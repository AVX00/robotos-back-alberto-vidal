/* eslint-disable no-underscore-dangle */
const { model, Schema } = require("mongoose");

const statsValidator = (stat) => stat >= 0 && stat <= 10;

const RobotSchema = new Schema({
  name: { type: String, required: true, unique: true },
  img: { type: String, required: true },
  stats: {
    speed: { type: Number, required: true },
    resistance: { type: Number, required: true, validate: statsValidator },
    "fabrication-date": { type: Date, required: true },
  },
});

RobotSchema.method("transform", function () {
  const robot = this.toObject();

  robot.id = robot._id;
  delete robot._id;

  return robot;
});

const Robot = model("Robot", RobotSchema, "robotos");

module.exports = Robot;
