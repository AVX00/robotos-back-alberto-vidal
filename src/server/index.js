const cors = require("cors");
const express = require("express");
const { default: helmet } = require("helmet");
const { notFound, errorHandler } = require("./middlewares/errors/errors");
const joselito = require("./middlewares/loggers/joselito");
const robotsRouter = require("./routers/robotsRouter");
const usersRouter = require("./routers/usersRouter");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(joselito);

app.use("/robots", robotsRouter);
app.use("/user", usersRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
