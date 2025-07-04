const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../Config/Database");
const { Category } = require("../models/Category.Model");

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("Category API", () => {
  let categoryId;

  test("POST /api/categories → should create a category", async () => {
    const res = await request(app).post("/api/categories").send({
      name: "Electronics",
      description: "Electronic items",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message", "Category created");
    expect(res.body.category).toHaveProperty("name", "Electronics");

    categoryId = res.body.category.id;
  });

  test("POST /api/categories → should fail on duplicate category", async () => {
    const res = await request(app).post("/api/categories").send({
      name: "Electronics",
      description: "Duplicate",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Category already exists");
  });

  test("GET /api/categories → should return all categories", async () => {
    const res = await request(app).get("/api/categories");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test("PUT /api/categories/:id → should update a category", async () => {
    const res = await request(app)
      .put(`/api/categories/${categoryId}`)
      .send({ name: "Updated Electronics", description: "Updated desc" });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Category updated");
    expect(res.body.category.name).toBe("Updated Electronics");
  });

  test("DELETE /api/categories/:id → should delete the category", async () => {
    const res = await request(app).delete(`/api/categories/${categoryId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Category deleted");

    const deleted = await Category.findByPk(categoryId);
    expect(deleted).toBeNull();
  });

  test("DELETE /api/categories/:id → should return 404 on invalid id", async () => {
    const res = await request(app).delete(`/api/categories/invalid-id`);

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Category not found");
  });
});
