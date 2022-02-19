const chalk = require("chalk");
const serverSays = require("debug")("robots:logger:");

const joselito = (req, res, next) => {
  const { ip, method, path, query } = req;

  let auth;
  if (query.token && query.token === process.env.TOKEN) {
    auth = chalk.green("authorized");
  } else {
    chalk.red("unauthorized");
  }

  const startTime = new Date();
  res.once("finish", () => {
    const duration = new Date() - startTime;
    serverSays(
      chalk.bgYellowBright.black.bold(
        `${ip} ${method}  at ${path} ${duration} ms `
      ),
      auth
    );
    serverSays("=======================================");
  });
  next();
};

module.exports = joselito;
