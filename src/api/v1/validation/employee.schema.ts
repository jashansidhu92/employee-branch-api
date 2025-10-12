import Joi from "joi";

export const createEmployeeSchema = Joi.object({
  name: Joi.string().min(2).max(80).required(),
  position: Joi.string().min(2).max(80).required(),
  department: Joi.string().min(2).max(80).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^[0-9\-+() ]{7,20}$/)
    .required()
    .messages({ "string.pattern.base": "Phone number format is invalid" }),
  branchId: Joi.number().integer().positive().required(),
});

export const updateEmployeeSchema = createEmployeeSchema.fork(
  ["name", "position", "department", "email", "phone", "branchId"],
  (schema) => schema.optional()
);
