"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../src/app"));
const firebaseConfig_1 = require("../../config/firebaseConfig");
const mockDb = firebaseConfig_1.db;
describe("Branch API Endpoints", () => {
    test("GET /api/v1/branches → should return a list of branches", async () => {
        firebaseConfig_1.db.collection.mockReturnValueOnce({
            get: jest.fn(async () => ({ docs: [] })),
        });
        const response = await (0, supertest_1.default)(app_1.default).get("/api/v1/branches");
        expect(response.statusCode).toEqual(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data).toBeInstanceOf(Array);
    });
    test("POST /api/v1/branches → validates body and creates", async () => {
        firebaseConfig_1.db.collection.mockReturnValueOnce({
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
        const response = await (0, supertest_1.default)(app_1.default)
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
        const response = await (0, supertest_1.default)(app_1.default)
            .post("/api/v1/branches")
            .send({ name: "M" });
        expect(response.statusCode).toEqual(422);
        expect(response.body.success).toBe(false);
    });
});
//# sourceMappingURL=branch.routes.test.js.map