const { default: mongoose } = require("mongoose");

const connectdb = async (key) =>
  new Promise((resolve, reject) => {
    mongoose.connect(key, (error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });

module.exports = connectdb;
