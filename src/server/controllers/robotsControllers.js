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

module.exports = { getRobots, getRobot };
