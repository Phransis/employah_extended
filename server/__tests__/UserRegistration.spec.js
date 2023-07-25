const request = require("supertest");
const app = require("../src/app");
const User = require("../src/user/User");
const sequelize = require("../src/config/database");

beforeAll(async () => {
  if (process.env.NODE_ENV === "test") {
    await sequelize.sync();
  }
});

beforeEach(async () => {
  await User.destroy({ truncate: { cascade: true } });
});

validUser = {
  firstName: "Frances",
  lastName: "Duo",
  email: "user1@mail.com",
  password: "P4ssword",
  skill: "frontend",
};
const postUser = (user = validUser) => {
  return request(app).post("/api/1.0/register").send(user);
};

describe("User Registration", () => {
  it("returns 200 OK when user registers successfully", async () => {
    const response = await postUser();
    expect(response.status).toBe(200);
  });
  it("returns success message when signup request is valid", async () => {
    const response = await postUser();
    expect(response.body.message).toBe("User created");
  });
  it("saves the user to database", async () => {
    await postUser();
    const userList = await User.findAll();
    expect(userList.length).toBe(1);
  });
});
