require("dotenv").config();
const serverSays = require("debug")("robots:root:");
const chalk = require("chalk");
const connectdb = require("./dataBase");

const raiseServer = require("./server");

const port = process.env.SERVER_PORT;
const key = process.env.MONGO_DB;

(async () => {
  try {
    await connectdb(key);
    await raiseServer(port);
  } catch (error) {
    serverSays(chalk.red(error));
  }
})();
