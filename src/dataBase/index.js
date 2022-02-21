/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const serverSays = require("debug")("robots:DB-root:");
const chalk = require("chalk");
const { default: mongoose } = require("mongoose");

const connectdb = async (key) =>
  new Promise((resolve, reject) => {
    serverSays(chalk.blue("Connecting to DB..."));
    mongoose.set("toJSON", {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret._id;
        delete ret.__v;
      },
    });
    mongoose.connect(key, (error) => {
      if (error) {
        serverSays(chalk.red("ERROR connecting to DB"));
        reject(error);
        return;
      }
      serverSays(chalk.green("Connection succesful !"));
      resolve();
    });
  });

module.exports = connectdb;
