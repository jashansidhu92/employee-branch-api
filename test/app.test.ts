import request from "supertest";
import app from "../src/app";

describe("API Routes", () => {
  it("GET / → should return API status message", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "API is running successfully 🚀");
  });

  it("GET /api/v1/hello → should return greeting message", async () => {
    const res = await request(app).get("/api/v1/hello");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("greeting", "Hello from the Express API!");
  });
});
