const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../Config/Database");
const { User } = require("../models/User.model");

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("Auth API", () => {
  test("should register a new user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      email: "testuser@example.com",
      password: "password123",
      role: "user",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("user");
    expect(res.body.user.email).toBe("testuser@example.com");
  });

  test("should not register an existing user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      email: "testuser@example.com",
      password: "password123",
      role: "user",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("User already exists");
  });

  test("should login successfully", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "testuser@example.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  test("should fail login with wrong password", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "testuser@example.com",
      password: "wrongpassword",
    });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Invalid credentials");
  });
});
