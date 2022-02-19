const chalk = require("chalk");
const serverSays = require("debug")("robots:joselito:");

const joselito = (req, res, next) => {
  const { ip, method, originalUrl } = req;
  const startTime = new Date();
  res.once("finish", () => {
    const duration = new Date() - startTime;
    serverSays(
      chalk.bgYellowBright.black.bold(
        `${ip} ${method}  at ${originalUrl} ${duration} ms`
      )
    );
    serverSays("=======================================");
  });
  next();
};

module.exports = joselito;
