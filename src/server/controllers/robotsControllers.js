const Robot = require("../../dataBase/models/Robot");

const getRobots = async (req, res, next) => {
  try {
    const robots = await Robot.find();
    res.status(200).json({ robots });
  } catch (error) {
    next(error);
  }
};

const getRobot = async (req, res, next) => {
  const { id } = req.params;
  try {
    const robot = await Robot.findById(id);
    res.status(200).json({ robot });
  } catch (error) {
    next(error);
  }
};

const createRobot = async (req, res, next) => {
  try {
    const robot = req.body;
    const newRobot = await Robot.create(robot);
    res.status(201).json(newRobot);
  } catch (error) {
    next(error);
  }
};

const updateRobot = async (req, res, next) => {
  try {
    const robot = req.body;
    // eslint-disable-next-line no-underscore-dangle
    const updatedRobot = await Robot.findByIdAndUpdate(robot._id, robot);
    res.status(200).json(updatedRobot);
  } catch (error) {
    next(error);
  }
};

const deleteRobot = async (req, res, next) => {};

module.exports = {
  getRobots,
  getRobot,
  createRobot,
  updateRobot,
  deleteRobot,
};
