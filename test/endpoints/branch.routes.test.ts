import request from "supertest";
import app from "../../src/app";
import { db } from "../../src/config/firebaseConfig";

const mockDb = db as unknown as any;

describe("Branch API Endpoints", () => {
  test("GET /api/v1/branches → should return a list of branches", async () => {
    (db.collection as jest.Mock).mockReturnValueOnce({
      get: jest.fn(async () => ({ docs: [] })),
    });

    const response = await request(app).get("/api/v1/branches");
    expect(response.statusCode).toEqual(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toBeInstanceOf(Array);
  });

  test("POST /api/v1/branches → validates body and creates", async () => {
    (db.collection as jest.Mock).mockReturnValueOnce({
      add: jest.fn(async () => ({
        get: jest.fn(async () => ({
          id: "x1",
          data: () => ({
            name: "Main",
            address: "12345 Main St",
            phone: "+1 204-555-0101",
          }),
        })),
      })),
    });

    const response = await request(app)
      .post("/api/v1/branches")
      .send({
        name: "Main",
        address: "12345 Main St",
        phone: "+1 204-555-0101",
      });

    expect(response.statusCode).toEqual(201);
    expect(response.body.success).toBe(true);
  });

  test("POST /api/v1/branches → rejects invalid payload", async () => {
    const response = await request(app)
      .post("/api/v1/branches")
      .send({ name: "M" });

    expect(response.statusCode).toEqual(422);
    expect(response.body.success).toBe(false);
  });
});
