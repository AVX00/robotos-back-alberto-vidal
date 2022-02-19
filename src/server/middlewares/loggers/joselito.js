const chalk = require("chalk");
const serverSays = require("debug")("robots:logger:");

const joselito = (req, res, next) => {
  const { ip, method, path, query } = req;
  // eslint-disable-next-line no-nested-ternary
  const auth = !query.token
    ? ""
    : query.token === process.env.TOKEN
    ? chalk.green("authorized")
    : chalk.red("unauthorized");
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
