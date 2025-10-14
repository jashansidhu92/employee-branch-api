import { Router } from "express";
import * as ctrl from "../controllers/branch.controller";
import { validateBody } from "../middleware/validate";
import { branchCreateSchema, branchUpdateSchema } from "../validation/branch.schema";


const router = Router();


router.get("/", ctrl.list);
router.get("/:id", ctrl.get);
router.post("/", validateBody(branchCreateSchema), ctrl.create);
router.put("/:id", validateBody(branchUpdateSchema), ctrl.update);
router.delete("/:id", ctrl.remove);


export default router;