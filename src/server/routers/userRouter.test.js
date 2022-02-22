const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
const request = require("supertest");
const app = require("..");
const connectdb = require("../../dataBase");
const User = require("../../dataBase/models/User");

let dataBase;

beforeAll(async () => {
  dataBase = await MongoMemoryServer.create();
  const uri = dataBase.getUri();
  await connectdb(uri);
});
beforeEach(async () => {
  await User.deleteMany({});
});
afterAll(() => {
  mongoose.connection.close();
  dataBase.stop();
});

describe("Given a users router", () => {
  describe("When it receives a post request at /user/register with body {userName: 'joselito': password:'123'} an username isn't taken", () => {
    test("Then it should respond with status 201 and a json {'user': 'created'}", async () => {
      const expectedResponse = { user: "created" };
      const expectedStatus = 201;
      const newUser = { userName: "joselito", password: "123" };

      const { body } = await request(app)
        .post("/user/register")
        .send(newUser)
        .expect(expectedStatus);

      expect(body).toEqual(expectedResponse);
    });
  });

  describe("When it receives a post request at /user/register with body {userName: 'joselito', password: '123' } and username is taken", () => {
    test("Then it should respond with status 409 and a json {error: 'userName taken'}", async () => {
      const expectedResponse = { error: "userName taken" };
      const expectedStatus = 409;
      const newUser = { userName: "joselito", password: "123" };
      User.create(newUser);

      const { body } = await request(app)
        .post("/user/register")
        .send(newUser)
        .expect(expectedStatus);

      expect(body).toEqual(expectedResponse);
    });
  });
});
