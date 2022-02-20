const chalk = require("chalk");
const serverSays = require("debug")("robots:logger:");

const joselito = (req, res, next) => {
  const { ip, method, path } = req;

  const startTime = new Date();
  res.once("finish", () => {
    const duration = new Date() - startTime;
    serverSays(
      chalk.bgYellowBright.black.bold(
        `${ip} ${method}  at ${path} ${duration} ms `
      )
    );
    serverSays("=======================================");
  });
  next();
};

module.exports = joselito;
