import Joi from "joi";

export const createBranchSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  address: Joi.string().min(4).max(200).required(),
  phone: Joi.string()
    .pattern(/^[0-9\-+() ]{7,20}$/)
    .required()
    .messages({ "string.pattern.base": "Phone number format is invalid" }),
});

export const updateBranchSchema = createBranchSchema.fork(
  ["name", "address", "phone"],
  (schema) => schema.optional()
);
