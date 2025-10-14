import Joi from "joi";


export const employeeCreateSchema = Joi.object({
name: Joi.string().min(2).max(80).required(),
position: Joi.string().min(2).max(80).required(),
email: Joi.string().email().required(),
branchId: Joi.string().required(),
department: Joi.string().min(2).max(80).optional(),
});


export const employeeUpdateSchema = Joi.object({
name: Joi.string().min(2).max(80),
position: Joi.string().min(2).max(80),
email: Joi.string().email(),
branchId: Joi.string(),
department: Joi.string().min(2).max(80),
}).min(1);