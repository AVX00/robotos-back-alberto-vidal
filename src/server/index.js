const serverSays = require("debug")("robots:server:");
const chalk = require("chalk");
const express = require("express");
const morgan = require("morgan");
const router = require("./routers/robotsRouter");

const app = express();

const raiseServer = async (port) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      serverSays(chalk.blue(`server listening at http://localhost:${port}`));
      resolve();
    });
    server.on("error", (error) => {
      reject(
        error.code === "EADDRINUSE" ? `port ${port} in use` : error.message
      );
    });
  });

app.use(morgan("dev"));

app.use("/robots", router);

module.exports = raiseServer;
