import { Request, Response, NextFunction } from 'express';
import { ForbiddenError } from '../api/v1/errors/ForbiddenError.js';


export function requireRoles(...roles: string[]) {
return (req: Request, _res: Response, next: NextFunction) => {
const userRoles = req.user?.roles ?? [];
const ok = roles.some(r => userRoles.includes(r));
if (!ok) throw new ForbiddenError('Insufficient role');
next();
};
}