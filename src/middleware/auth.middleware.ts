import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../api/v1/errors/UnauthorizedError.js';


export interface AuthUser {
uid: string;
email?: string;
roles: string[];
}


declare module 'express-serve-static-core' {
interface Request { user?: AuthUser }
}

export function authenticate(req: Request, _res: Response, next: NextFunction) {
const auth = req.header('authorization')?.replace(/^Bearer\s+/i, '');
if (!auth) throw new UnauthorizedError('Missing bearer token');
if (auth === 'demo-admin') {
req.user = { uid: '1', email: 'admin@example.com', roles: ['admin'] };
} else if (auth === 'demo-user') {
req.user = { uid: '2', email: 'user@example.com', roles: ['user'] };
} else {
throw new UnauthorizedError('Invalid token');
}
next();
}