const server = require("../../../server/index");
const request = require("supertest");
const db = require("../../database/index");
const { Authorizer } = require("@authorizerdev/authorizer-js");
//retry failed test 3 times
jest.retryTimes(3);
//set time out to 1 minute
jest.setTimeout(60000);

let user;

beforeEach(async () => {
  jest.spyOn(global.console, "error").mockImplementation(() => {});
  //get authorizer reference in order to sign in a user
  const authRef = new Authorizer({
    authorizerURL: process.env.AUTH_URL,
    redirectURL: process.env.SITE_URL,
    clientID: process.env.AUTH_CLIENT_ID,
  });
  //sign user in to receive access token then assign
  //user details to user variable
  user = await authRef.login({
    email: "foo@bar.com",
    password: "test123",
  });
  //prepare database and seed with mock data
  await db.schema.dropTableIfExists("posts");
  await db.schema.createTable("posts", (table) => {
    table.increments("id");
    table.text("message").notNullable();
    table.string("user_name").notNullable();
    table.timestamps(true, true);
  });
  await db.seed.run();
});
afterAll(() => {
  global.console.error.mockRestore();
});
describe("get posts", () => {
  it("should return a status of 200", async () => {
    await request(server)
      .get("/wall/get-posts")
      .expect("Content-Type", /json/)
      .expect(200);
  });
  it("should return an array of posts if successful", async () => {
    const res = await request(server).get("/wall/get-posts");
    expect(Array.isArray(res.body)).toBe(true);
  });
  it("should return a status of 500 if there is a database error", async () => {
    //drop table to mock database error
    await db.schema.dropTableIfExists("posts");
    const res = await request(server).get("/wall/get-posts").expect(500);
    expect(res.body.message).toEqual("internal server error");
  });
});
describe("add posts", () => {
  it("should return a status of 201 and array of posts if successful", async () => {
    const res = await request(server)
      .post("/wall/add-post")
      .send({ message: "test post", user_name: "foobar" })
      .set("Authorization", user.access_token)
      .expect("Content-Type", /json/)
      .expect(201);
    expect(Array.isArray(res.body)).toBe(true);
  });
  it("should return 401 if no token is provided", async () => {
    const res = await request(server)
      .post("/wall/add-post")
      .send({ message: "test post", user_name: "foobar" });
    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toEqual("token not valid");
  });
  it("should return 400 if no message is provided in request body", async () => {
    const res = await request(server)
      .post("/wall/add-post")
      .send({ user_name: "foobar" })
      .set("Authorization", user.access_token);
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual(
      "bad request, message and user_name required"
    );
    expect(console.error).toHaveBeenCalled();
  });
  it("should return 400 if no user_name is provided in request body", async () => {
    const res = await request(server)
      .post("/wall/add-post")
      .send({ message: "test message" })
      .set("Authorization", user.access_token);
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual(
      "bad request, message and user_name required"
    );
    expect(console.error).toHaveBeenCalled();
  });
  it("should return 500 if there is a database error", async () => {
    //drop table to mock database error
    await db.schema.dropTableIfExists("posts");
    const res = await request(server)
      .post("/wall/add-post")
      .send({ message: "test message", user_name: "foobar" })
      .set("Authorization", user.access_token);
    expect(res.statusCode).toEqual(500);
    expect(res.body.message).toEqual("internal server error");
    // expect(console.error).toHaveBeenCalled();
  });
});
