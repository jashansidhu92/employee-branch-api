import { Router } from "express"; 
import * as ctrl from "../controllers/employee.controller";
import { validateBody } from "../middleware/validate";
import { employeeCreateSchema, employeeUpdateSchema } from "../validation/employee.schema";

const router = Router();

router.get("/", ctrl.list);
router.get("/:id", ctrl.get);
router.get("/by-branch/:branchId", ctrl.byBranch);
router.get("/by-department/:department", ctrl.byDepartment);
router.post("/", validateBody(employeeCreateSchema), ctrl.create);
router.put("/:id", validateBody(employeeUpdateSchema), ctrl.update);
router.delete("/:id", ctrl.remove);

export default router; 
