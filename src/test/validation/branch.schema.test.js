"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const branch_schema_1 = require("../../src/api/v1/validation/branch.schema");
describe("Branch validation", () => {
    it("accepts valid create payload", () => {
        const { error } = branch_schema_1.branchCreateSchema.validate({ name: "Main", address: "123 St", phone: "+1 204-555-0101" });
        expect(error).toBeUndefined();
    });
    it("rejects invalid update payload (empty)", () => {
        const { error } = branch_schema_1.branchUpdateSchema.validate({});
        expect(error).toBeTruthy();
    });
});
//# sourceMappingURL=branch.schema.test.js.map