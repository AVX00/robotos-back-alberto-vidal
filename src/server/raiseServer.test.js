const express = require("express");
const raiseServer = require("./raiseServer");

describe("Given a raise server function", () => {
  describe("When it's called with a port and an express app", () => {
    test("Then it should call listen method of app with the received port", async () => {
      const port = 3000;
      const app = express();
      jest.spyOn(app, "listen");

      await raiseServer(port, app);

      expect(app.listen).toHaveBeenCalled();
    });
  });
});
