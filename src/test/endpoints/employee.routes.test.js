"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../src/app"));
const firebaseConfig_1 = require("../../config/firebaseConfig");
const mockDb = firebaseConfig_1.db;
describe("Employee API Endpoints", () => {
    test("GET /api/v1/employees → should return a list of employees", async () => {
        firebaseConfig_1.db.collection.mockReturnValueOnce({ get: jest.fn(async () => ({ docs: [] })) });
        const response = await (0, supertest_1.default)(app_1.default).get("/api/v1/employees");
        expect(response.statusCode).toEqual(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data).toBeInstanceOf(Array);
    });
    test("POST /api/v1/employees → validates and creates", async () => {
        firebaseConfig_1.db.collection.mockReturnValueOnce({ add: jest.fn(async () => ({ get: jest.fn(async () => ({ id: "e1", data: () => ({ name: "Alice", position: "Mgr", email: "a@e.com", branchId: "b1" }) })) })) });
        const response = await (0, supertest_1.default)(app_1.default)
            .post("/api/v1/employees")
            .send({ name: "Alice", position: "Mgr", email: "a@e.com", branchId: "b1" });
        expect(response.statusCode).toEqual(201);
        expect(response.body.success).toBe(true);
    });
    test("POST /api/v1/employees → rejects invalid email", async () => {
        const response = await (0, supertest_1.default)(app_1.default)
            .post("/api/v1/employees")
            .send({ name: "Bob", position: "Clerk", email: "bad", branchId: "b1" });
        expect(response.statusCode).toEqual(422);
        expect(response.body.success).toBe(false);
    });
});
//# sourceMappingURL=employee.routes.test.js.map