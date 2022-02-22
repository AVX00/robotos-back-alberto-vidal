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
  User.deleteMany({});
});
afterAll(() => {
  mongoose.connection.close();
  dataBase.stop();
});

describe("Given a users router", () => {
  describe("When it receibes a post request at /user/register with body {userName: 'joselito': password:'123'}", () => {
    test("Then it should respond with status 201 and a json {'user': 'created'}", async () => {
      const expectedResponse = { user: "created" };
      const newUser = { userName: "joselito", password: "123" };

      const { body } = await request(app)
        .post("/user/register")
        .send(newUser)
        .expect(201);

      expect(body).toEqual(expectedResponse);
    });
  });
});
