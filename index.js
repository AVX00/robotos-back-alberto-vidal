require("dotenv").config();
const serverSays = require("debug")("robots:");
const chalk = require("chalk");
const express = require("express");

const port = process.env.SERVER_PORT;

const app = express();

app.listen(port, () =>
  serverSays(chalk.blue(`server listening at http://localhost:${port}`))
);
