import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";


export const validateBody = (schema: ObjectSchema) => {
return (req: Request, _res: Response, next: NextFunction) => {
const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });
if (error) {
const details = error.details.map((d) => d.message).join("; ");
const err: any = new Error(details);
err.status = 422;
return next(err);
}
req.body = value; 
next();
};
};