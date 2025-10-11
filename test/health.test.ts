import request from "supertest";
import app from "../src/app";

describe("Health Check Endpoint", () => {
  it("GET /api/v1/health → should return server health info", async () => {
    const res = await request(app).get("/api/v1/health");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("status", "OK");
    expect(res.body).toHaveProperty("uptime");
    expect(res.body).toHaveProperty("timestamp");
    expect(res.body).toHaveProperty("version", "1.0.0");
  });

  it("should return uptime as a number greater than 0", async () => {
    const res = await request(app).get("/api/v1/health");
    expect(typeof res.body.uptime).toBe("number");
    expect(res.body.uptime).toBeGreaterThan(0);
  });

  it("should return a valid ISO timestamp", async () => {
    const res = await request(app).get("/api/v1/health");
    expect(() => new Date(res.body.timestamp)).not.toThrow();
  });
});
