const raiseServer = require("./raiseServer");

describe("Given a raise server function", () => {
  describe("When it's called with a port and an express app", () => {
    test("Then it should call listen method of app with the received port", () => {
      const port = 3000;
      const app = { listen: jest.fn() };

      raiseServer(port, app);

      expect(app.listen).toHaveBeenCalledWith(port);
    });
  });
});
