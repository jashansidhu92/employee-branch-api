import { Request, Response, NextFunction } from "express";
import * as service from "../services/branch.service";
import { ok, fail } from "../models/apiResponse";


export const create = async (req: Request, res: Response, next: NextFunction) => {
try {
const created = await service.createBranch(req.body);
res.status(201).json(ok(created));
} catch (e: any) {
next(fail(e.message || "Failed to create branch", 500));
}
};


export const list = async (_req: Request, res: Response, next: NextFunction) => {
try {
const items = await service.getBranches();
res.json(ok(items));
} catch (e: any) {
next(fail(e.message || "Failed to fetch branches", 500));
}
};


export const get = async (req: Request, res: Response, next: NextFunction) => {
try {
const item = await service.getBranchById(req.params.id);
if (!item) return next(fail("Branch not found", 404));
res.json(ok(item));
} catch (e: any) {
next(fail(e.message || "Failed to fetch branch", 500));
}
};


export const update = async (req: Request, res: Response, next: NextFunction) => {
try {
const updated = await service.updateBranch(req.params.id, req.body);
if (!updated) return next(fail("Branch not found", 404));
res.json(ok(updated));
} catch (e: any) {
next(fail(e.message || "Failed to update branch", 500));
}
};


export const remove = async (req: Request, res: Response, next: NextFunction) => {
try {
const okDelete = await service.deleteBranch(req.params.id);
if (!okDelete) return next(fail("Branch not found", 404));
res.status(204).send();
} catch (e: any) {
next(fail(e.message || "Failed to delete branch", 500));
}
};