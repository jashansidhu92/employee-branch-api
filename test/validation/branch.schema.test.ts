import { branchCreateSchema, branchUpdateSchema } from "../../src/api/v1/validation/branch.schema";


describe("Branch validation", () => {
it("accepts valid create payload", () => {
const { error } = branchCreateSchema.validate({ name: "Main", address: "123 St", phone: "+1 204-555-0101" });
expect(error).toBeUndefined();
});


it("rejects invalid update payload (empty)", () => {
const { error } = branchUpdateSchema.validate({});
expect(error).toBeTruthy();
});
});