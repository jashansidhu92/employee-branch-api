import request from "supertest";
import app from "../../src/app";
import { db } from "../../src/config/firebaseConfig";
const mockDb = db as unknown as any;



describe("Employee API Endpoints", () => {
test("GET /api/v1/employees → should return a list of employees", async () => {
(db.collection as jest.Mock).mockReturnValueOnce({ get: jest.fn(async () => ({ docs: [] })) });
const response = await request(app).get("/api/v1/employees");
expect(response.statusCode).toEqual(200);
expect(response.body.success).toBe(true);
expect(response.body.data).toBeInstanceOf(Array);
});


test("POST /api/v1/employees → validates and creates", async () => {
(db.collection as jest.Mock).mockReturnValueOnce({ add: jest.fn(async () => ({ get: jest.fn(async () => ({ id: "e1", data: () => ({ name: "Alice", position: "Mgr", email: "a@e.com", branchId: "b1" }) })) })) });
const response = await request(app)
.post("/api/v1/employees")
.send({ name: "Alice", position: "Mgr", email: "a@e.com", branchId: "b1" });
expect(response.statusCode).toEqual(201);
expect(response.body.success).toBe(true);
});


test("POST /api/v1/employees → rejects invalid email", async () => {
const response = await request(app)
.post("/api/v1/employees")
.send({ name: "Bob", position: "Clerk", email: "bad", branchId: "b1" });
expect(response.statusCode).toEqual(422);
expect(response.body.success).toBe(false);
});
});