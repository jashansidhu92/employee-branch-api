import request from "supertest";
import app from "../src/app";

describe("Branch API CRUD", () => {
  it("should create a new branch", async () => {
    const res = await request(app).post("/api/v1/branches").send({
      name: "Calgary South Branch",
      address: "500 7th Ave SW, Calgary, AB",
      phone: "403-555-0105",
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe("Calgary South Branch");
  });

  it("should return 400 for missing fields", async () => {
    const res = await request(app).post("/api/v1/branches").send({
      name: "Incomplete Branch",
    });
    expect(res.status).toBe(400);
  });

  it("should return all branches", async () => {
    const res = await request(app).get("/api/v1/branches");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should return one branch by ID", async () => {
    const res = await request(app).get("/api/v1/branches/1");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id", 1);
  });

  it("should return 404 for invalid ID", async () => {
    const res = await request(app).get("/api/v1/branches/9999");
    expect(res.status).toBe(404);
  });

  it("should update a branch", async () => {
    const res = await request(app).put("/api/v1/branches/1").send({
      phone: "604-555-9999",
    });
    expect(res.status).toBe(200);
    expect(res.body.phone).toBe("604-555-9999");
  });

  it("should delete a branch", async () => {
    const res = await request(app).delete("/api/v1/branches/1");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Branch deleted successfully");
  });
});
