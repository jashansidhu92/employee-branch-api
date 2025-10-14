import { employeeCreateSchema, employeeUpdateSchema } from "../../src/api/v1/validation/employee.schema";


describe("Employee validation", () => {
it("accepts valid create payload", () => {
const { error } = employeeCreateSchema.validate({
name: "Alice",
position: "Manager",
email: "alice@example.com",
branchId: "branch123",
department: "HR",
});
expect(error).toBeUndefined();
});


it("rejects invalid email", () => {
const { error } = employeeCreateSchema.validate({
name: "Bob",
position: "Clerk",
email: "not-an-email",
branchId: "b1",
});
expect(error).toBeTruthy();
});


it("rejects empty update", () => {
const { error } = employeeUpdateSchema.validate({});
expect(error).toBeTruthy();
});
});