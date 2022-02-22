require("dotenv").config();
const serverSays = require("debug")("robots:root:");
const chalk = require("chalk");
const connectdb = require("./dataBase");
const app = require("./server");

const raiseServer = require("./server");

const port = process.env.PORT;
const key = process.env.MONGO_DB;

(async () => {
  try {
    await connectdb(key);
    await raiseServer(port, app);
  } catch (error) {
    serverSays(chalk.red(error));
  }
})();
