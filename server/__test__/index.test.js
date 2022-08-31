const server = require("../../server/index");
const request = require("supertest");
const db = require("../database/index");
const { Authorizer } = require("@authorizerdev/authorizer-js");

//set time out to 1 minute
jest.setTimeout(60000);
//create new table and seed posts before the tests run
beforeAll(async () => {
  await db.raw(`DROP TABLE IF EXISTS posts`);
  await db.raw(`CREATE TABLE posts(
    id serial PRIMARY KEY,
    message text NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  )`);
  await db.migrate.latest();
  await db.seed.run();
});

describe("api is up", () => {
  it("returns status code 200 and a sanity check message if passed", async () => {
    const res = await request(server).get("/");
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("sanity check");
  });
});
describe("login to auth instance", () => {
  it("returns a user object after successful login", async () => {
    const authRef = new Authorizer({
      authorizerURL: process.env.AUTH_URL,
      redirectURL: process.env.SITE_URL,
      clientID: process.env.AUTH_CLIENT_ID,
    });
    const res = await authRef.login({
      email: "foo@bar.com",
      password: "test123",
    });
    expect(res.user.email).toEqual("foo@bar.com");
    expect(res.message).toEqual("Logged in successfully");
    expect(res.access_token).toEqual(expect.any(String));
  });
});
