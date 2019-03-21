const request = require("supertest");

const app = require("../../src/app");
const truncate = require("../utils/truncate");
const { User } = require("../../src/app/models");

describe("Authentication", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should be able to authenticate with valid credentials", async () => {
    const user = await User.create({
      name: "Felipe",
      email: "fschierice@gmail.com",
      password: "123123"
    });

    const response = await request(app)
      .post("/sessions")
      .send({
        email: "fschierice@gmail.com",
        password: "123123"
      });

    expect(response.status).toBe(200);
  });

  it("should be able to authenticate with invalid credentials", async () => {
    const user = await User.create({
      name: "Felipe",
      email: "fschierice2@gmail.com",
      password: "123123"
    });

    const response = await request(app)
      .post("/sessions")
      .send({
        email: "fschierice2@gmail.com",
        password: "123456"
      });

    expect(response.status).toBe(401);
  });
});
