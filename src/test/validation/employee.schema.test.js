"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const employee_schema_1 = require("../../src/api/v1/validation/employee.schema");
describe("Employee validation", () => {
    it("accepts valid create payload", () => {
        const { error } = employee_schema_1.employeeCreateSchema.validate({
            name: "Alice",
            position: "Manager",
            email: "alice@example.com",
            branchId: "branch123",
            department: "HR",
        });
        expect(error).toBeUndefined();
    });
    it("rejects invalid email", () => {
        const { error } = employee_schema_1.employeeCreateSchema.validate({
            name: "Bob",
            position: "Clerk",
            email: "not-an-email",
            branchId: "b1",
        });
        expect(error).toBeTruthy();
    });
    it("rejects empty update", () => {
        const { error } = employee_schema_1.employeeUpdateSchema.validate({});
        expect(error).toBeTruthy();
    });
});
//# sourceMappingURL=employee.schema.test.js.map