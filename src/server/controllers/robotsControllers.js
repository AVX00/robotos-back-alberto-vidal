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
  const { token } = req.params;
  if (token === process.env.TOKEN) {
    try {
      const robot = req.body;
      await Robot.create(robot);
      res.status(201).json({});
    } catch (error) {
      next(error);
    }
  } else {
    res.status(401).json({ error: "unauthorized" });
  }
};

module.exports = { getRobots, getRobot, createRobot };
