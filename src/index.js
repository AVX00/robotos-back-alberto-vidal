require("dotenv").config();
const serverSays = require("debug")("robots:root:");
const chalk = require("chalk");

const raiseServer = require("./server");

const port = process.env.SERVER_PORT;

(async () => {
  try {
    await raiseServer(port);
  } catch (error) {
    serverSays(chalk.red(error));
  }
})();
