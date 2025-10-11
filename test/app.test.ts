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

  it("GET /api/v1/health → should return server health info", async () => {
    const res = await request(app).get("/api/v1/health");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("status", "OK");
    expect(res.body).toHaveProperty("uptime");
    expect(res.body).toHaveProperty("timestamp");
    expect(res.body).toHaveProperty("version");
  });

  it("GET /api/v1/portfolio/performance → should calculate portfolio performance", async () => {
    const res = await request(app)
      .get("/api/v1/portfolio/performance")
      .query({ initial: 10000, current: 12500 });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("initialInvestment", 10000);
    expect(res.body).toHaveProperty("currentValue", 12500);
    expect(res.body).toHaveProperty("percentageChange", 25);
    expect(res.body).toHaveProperty(
      "performanceSummary",
      expect.stringContaining("gained")
    );
  });

  it("GET /api/v1/portfolio/performance → should return 400 for invalid query params", async () => {
    const res = await request(app)
      .get("/api/v1/portfolio/performance")
      .query({ initial: "abc", current: "xyz" });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  it("GET /api/v1/portfolio/largest-holding → should find the largest holding", async () => {
    const res = await request(app)
      .get(
        "/api/v1/portfolio/largest-holding?assets=Stocks:8000,Bonds:2000,House:15000"
      );

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("name", "House");
    expect(res.body).toHaveProperty("value", 15000);
  });

  it("GET /api/v1/portfolio/allocation → should calculate asset allocation", async () => {
    const res = await request(app)
      .get(
        "/api/v1/portfolio/allocation?assets=Stocks:8000,Bonds:2000,RealEstate:15000"
      );

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty("name");
    expect(res.body[0]).toHaveProperty("percentage");
  });

  it("GET /api/v1/portfolio/allocation → should return 400 if no query assets provided", async () => {
    const res = await request(app).get("/api/v1/portfolio/allocation");
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });
});
