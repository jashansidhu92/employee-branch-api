import { Router } from "express";
import * as branchController from "../controllers/branchController";
import { validateBody } from "../middleware/validate";
import {
  createBranchSchema,
  updateBranchSchema,
} from "../validation/branch.schema";

const router = Router();

router.get("/", branchController.getAll);
router.get("/:id", branchController.getById);
router.post("/", validateBody(createBranchSchema), branchController.create);
router.put("/:id", validateBody(updateBranchSchema), branchController.update);
router.delete("/:id", branchController.remove);

export default router;
