import request from "supertest";
import app from "../src/app";

describe("Employee validation", () => {
  it("should reject invalid employee data", async () => {
    const res = await request(app)
      .post("/api/v1/employees")
      .send({ name: "OnlyName" });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it("should accept valid employee data", async () => {
    const res = await request(app)
      .post("/api/v1/employees")
      .send({
        name: "Alice Smith",
        position: "Analyst",
        department: "Loans",
        email: "alice@example.com",
        phone: "204-555-9988",
        branchId: "b123",
      });
    expect([200, 201]).toContain(res.status);
    expect(res.body.success).toBe(true);
  });
});
