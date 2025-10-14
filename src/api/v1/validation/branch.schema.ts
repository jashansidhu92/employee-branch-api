import Joi from "joi";


export const branchCreateSchema = Joi.object({
name: Joi.string().min(2).max(80).required(),
address: Joi.string().min(5).max(200).required(),
phone: Joi.string().pattern(/^[0-9+\-()\s]{7,20}$/).required(),
});


export const branchUpdateSchema = Joi.object({
name: Joi.string().min(2).max(80),
address: Joi.string().min(5).max(200),
phone: Joi.string().pattern(/^[0-9+\-()\s]{7,20}$/),
}).min(1);