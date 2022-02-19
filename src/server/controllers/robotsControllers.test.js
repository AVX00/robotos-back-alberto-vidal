const Robot = require("../../dataBase/models/Robot");
const {
  getRobots,
  getRobot,
  createRobot,
  updateRobot,
} = require("./robotsControllers");

jest.mock("../../dataBase/models/Robot");

describe("Given a getRobots controller", () => {
  beforeEach(() => jest.resetAllMocks());

  describe("When it's invoked with req res and next and req has property query.idRobot", () => {
    test("Then the function next should be invoked", () => {
      const req = { query: { idRobot: 3 } };
      const next = jest.fn();
      const res = null;

      getRobots(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When it's invoked with req and res and req doesn't have the property query.idRobot", () => {
    test("Then the functions res.status and res.json should be invoked with status 200 and json []", async () => {
      const robots = [];
      const status = 200;
      Robot.find = jest.fn().mockResolvedValue(robots);
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();
      const req = { query: {} };

      await getRobots(req, res, next);

      expect(Robot.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(status);
      expect(res.json).toHaveBeenCalledWith({ robots });
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe("When it's invoked with req , res and next and req doesn't have the propertiy query.idRobot and an the Robot.find results rejected", () => {
    test("Then the function next should be called with the reject reason", async () => {
      const reason = new Error("error reason");
      Robot.find = jest.fn().mockRejectedValue(reason);
      const req = { query: {} };
      const next = jest.fn();
      const res = null;

      await getRobots(req, res, next);

      expect(Robot.find).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(reason);
    });
  });
});

describe("Given a getRobot controller", () => {
  describe("When it's called with req with propertiy query.id , res, and next and Robot.find resolves", () => {
    test("Then res.status and res.json should have been called with 200 and the resolution", async () => {
      const robot = {};
      const status = 200;
      const req = { query: { id: 3 } };
      const next = jest.fn();
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      Robot.findById = jest.fn().mockResolvedValue(robot);

      await getRobot(req, res, next);

      expect(next).not.toHaveBeenCalled();
      expect(Robot.findById).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({ robot });
      expect(res.status).toHaveBeenCalledWith(status);
    });
  });

  describe("When it's called with req with property query.id, res and next and Robot.find rejects", () => {
    test("Then next should be called with reject reason", async () => {
      const next = jest.fn();
      const reason = new Error("good reason");
      const req = { query: { id: 78 } };
      const res = null;
      Robot.findById = jest.fn().mockRejectedValue(reason);

      await getRobot(req, res, next);

      expect(Robot.findById).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(reason);
    });
  });
});

describe("Given a creatoRobot controller", () => {
  describe("When it's called with req with property body with value {robot:'robot'} and res", () => {
    test("Then the method res.status and res.json should be called with 200 and the Robot.create resolution", async () => {
      const status = 201;
      const robot = { robot: "robot" };
      const newRobot = { ...robot, id: 3 };
      const req = { body: robot };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      Robot.create = jest.fn().mockResolvedValue(newRobot);

      await createRobot(req, res);

      expect(Robot.create).toHaveBeenCalledWith(robot);
      expect(res.status).toHaveBeenCalledWith(status);
      expect(res.json).toHaveBeenCalledWith(newRobot);
    });
  });

  describe("When it's called with req res and next and Robot.create rejects", () => {
    test("Then the function next should be called with the rejection reason", async () => {
      const reason = new Error("reason reason");
      const next = jest.fn();
      const res = null;
      const req = { body: null };
      Robot.create = jest.fn().mockRejectedValue(reason);

      await createRobot(req, res, next);

      expect(Robot.create).toHaveBeenCalled();
      expect(next).toBeCalledWith(reason);
    });
  });

  describe("When it's called with req res and next and req.body has a robot with stats over 10", () => {
    test("Then the method next shold be called", async () => {
      const robot = {
        name: "name",
        img: "url.img",
        stats: {
          speed: 12,
          resistance: -32,
          "fabrication-date": new Date(),
        },
      };
      const next = jest.fn();
      const req = { body: { robot } };
      const res = null;

      await createRobot(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});

describe("Given a update Robot controller", () => {
  describe("When it's called with req res and next and Robot.findByIdAndUpdate resolves", () => {
    test("Then res.status and res.json should be called with 200 and the value returned by findByIdAndUpdate", async () => {
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const req = { body: { robot: {} } };
      const next = jest.fn();
      const newRobot = {};
      const status = 200;
      Robot.findByIdAndUpdate = jest.fn().mockResolvedValue(newRobot);

      await updateRobot(req, res, next);

      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(status);
      expect(res.json).toHaveBeenCalledWith(newRobot);
    });
  });

  describe("When it's called with req res and next and req body does not have a robot", () => {
    test("Then the function next should be called", async () => {
      const next = jest.fn();
      const req = { body: {} };
      const res = null;

      await updateRobot(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When it's called with req res next and Robot.findByIdAndUpdate rejects", () => {
    test("Then the function next should be called with rejection reason", async () => {
      const reason = new Error("reason");
      const next = jest.fn();
      const req = { body: { robot: {} } };
      const res = null;
      Robot.findByIdAndUpdate = jest.fn().mockRejectedValue(reason);

      await updateRobot(req, res, next);

      expect(next).toHaveBeenCalledWith(reason);
    });
  });
});
