const Robot = require("../../dataBase/models/Robot");

const tokenValidator = (req) => {
  const { token } = req.query;
  return token === process.env.TOKEN;
};

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
  if (tokenValidator(req)) {
    try {
      const robot = req.body;
      const newRobot = await Robot.create(robot);
      res.status(201).json(newRobot);
    } catch (error) {
      next(error);
    }
  } else {
    res.status(401).json({ error: "unauthorized" });
  }
};

const updateRobot = async (req, res, next) => {
  if (tokenValidator(req)) {
    try {
      const robot = req.body;
      // eslint-disable-next-line no-underscore-dangle
      const updatedRobot = await Robot.findByIdAndUpdate(robot._id, robot);
      res.status(200).json(updatedRobot);
    } catch (error) {
      next(error);
    }
  } else {
    res.status(401).json({ error: "unauthorized" });
  }
};

module.exports = { getRobots, getRobot, createRobot, updateRobot };
