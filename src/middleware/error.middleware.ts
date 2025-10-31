import { Request, Response, NextFunction } from 'express';
import { AppError } from '../api/v1/errors/AppError.js';
import { logger } from '../config/logger.js';


export function notFound(_req: Request, _res: Response, next: NextFunction) {
next(new AppError('Route not found', 404, 'NOT_FOUND'));
}


export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
const known = err instanceof AppError;
const status = known ? err.status : 500;
const code = known ? err.code : 'INTERNAL_ERROR';
const message = known ? err.message : 'Something went wrong';


logger.error(`[${code}] ${message}`);
res.status(status).json({ success: false, error: { code, message } });
}