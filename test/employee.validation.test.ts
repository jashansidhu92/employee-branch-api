import request from "supertest";
import app from "../src/app";

describe("Employee validation", () => {
  it("should reject invalid employee data", async () => {
    const res = await request(app).post("/api/v1/employees").send({
      name: "A",
      email: "invalid",
      branchId: "xyz",
    });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(Array.isArray(res.body.details)).toBe(true);
  });

  it("should accept valid employee data", async () => {
    const res = await request(app).post("/api/v1/employees").send({
      name: "Alice Johnson",
      position: "Manager",
      department: "Finance",
      email: "alice@example.com",
      phone: "604-555-0101",
      branchId: 1,
    });

    expect([200, 201]).toContain(res.status);
    expect(res.body.success).toBe(true);
  });
});
