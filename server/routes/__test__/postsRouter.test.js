const server = require("../../../server/index");
const request = require("supertest");
const db = require("../../database/index");
const { Authorizer } = require("@authorizerdev/authorizer-js");
//retry failed test 3 times
jest.retryTimes(3);
//set time out to 1 minute
jest.setTimeout(60000);

describe("get posts", () => {
  it("should return a status of 200", async () => {
    const res = await request(server)
      .get("/wall/get-posts")
      .expect("Content-Type", /json/)
      .expect(200);
  });
  it("should return an array of posts if successful", async () => {
    const res = await request(server).get("/wall/get-posts");
    expect(Array.isArray(res.body)).toBe(true);
  });
});
describe("add posts", () => {
  const authRef = new Authorizer({
    authorizerURL: process.env.AUTH_URL,
    redirectURL: process.env.SITE_URL,
    clientID: process.env.AUTH_CLIENT_ID,
  });
  it("should return a status of 201 and array of posts if successful", async () => {
    const user = await authRef.login({
      email: "foo@bar.com",
      password: "test123",
    });
    const res = await request(server)
      .post("/wall/add-post")
      .send({ message: "test post" })
      .set("Authorization", user.access_token)
      .expect(201);
    expect(Array.isArray(res.body)).toBe(true);
  });
  it("should return 401 if no token is provided", async () => {
    const res = await request(server)
      .post("/wall/add-post")
      .send({ message: "test post" });
    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toEqual("token not valid");
  });
});
