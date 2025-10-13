import Joi from "joi";

export const createBranchSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  address: Joi.string().min(5).max(150).required(),
  phone: Joi.string().pattern(/^[0-9-]+$/).required(),
});

export const updateBranchSchema = Joi.object({
  name: Joi.string().min(2).max(100),
  address: Joi.string().min(5).max(150),
  phone: Joi.string().pattern(/^[0-9-]+$/),
});
