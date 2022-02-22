const serverSays = require("debug")("robots:server:");
const chalk = require("chalk");

const raiseServer = async (port, app) =>
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

module.exports = raiseServer;
