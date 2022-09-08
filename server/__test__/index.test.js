const server = require("../../server/index");
const sendWelcomeEmail = require("../middleware/sendWelcomeEmail");
const verifyToken = require("../middleware/verifyToken");
const request = require("supertest");
const db = require("../database/index");
const { Authorizer } = require("@authorizerdev/authorizer-js");
//retry failed test 3 times
jest.retryTimes(3);
//set time out to 1 minute
jest.setTimeout(60000);
//create new table and seed posts before the tests run
let user;

beforeAll(async () => {
  //get authorizer reference in order to sign in a user
  const authRef = new Authorizer({
    authorizerURL: process.env.AUTH_URL,
    redirectURL: process.env.SITE_URL,
    clientID: process.env.AUTH_CLIENT_ID,
  });
  //sign user in to receive access token then assign
  //user details to user variable
  //*Note user with the following credentials must exist
  //or change login info to match your own test user credentials
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

describe("api is up", () => {
  it("returns status code 200 and a sanity check message if passed", async () => {
    const res = await request(server).get("/");
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("sanity check");
  });
});
describe("login to auth instance", () => {
  it("returns a user object after successful login", async () => {
    expect(user.user.email).toEqual("foo@bar.com");
    expect(user.message).toEqual("Logged in successfully");
    expect(user.access_token).toEqual(expect.any(String));
  });
});
describe("send welcome email", () => {
  it("should send email after successful signup", async () => {
    const res = await request(server.use(verifyToken, sendWelcomeEmail))
      .post("/welcome")
      .send({ email: "bar@baz.com" })
      .set("Authorization", user.access_token);
    expect(res.statusCode).toEqual(200);
    //checks if the email was accepted by the address provided
    expect(res.body).toEqual(expect.arrayContaining(["bar@baz.com"]));
    // expect(process.env.NODE_ENV).toEqual("test");
  });
  it("should return 500 error if no email is provided in request", async () => {
    const res = await request(server.use(verifyToken, sendWelcomeEmail))
      .post("/welcome")
      .send()
      .set("Authorization", user.access_token);
    expect(res.statusCode).toEqual(500);
    expect(res.body.message).toEqual("internal server error");
  });
});
