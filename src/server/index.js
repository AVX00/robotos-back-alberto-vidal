const serverSays = require("debug")("robots:server:");
const chalk = require("chalk");
const cors = require("cors");
const express = require("express");
const { default: helmet } = require("helmet");
const { notFound, errorHandler } = require("./middlewares/errors/errors");
const joselito = require("./middlewares/loggers/joselito");
const robotsRouter = require("./routers/robotsRouter");
const usersRouter = require("./routers/usersRouter");

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

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(joselito);

app.use("/robots", robotsRouter);
app.use("/user", usersRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = raiseServer;
