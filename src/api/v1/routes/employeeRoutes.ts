import { Router } from "express";
import * as employeeController from "../controllers/employeeController";
import { validateBody } from "../middleware/validate";
import {
  createEmployeeSchema,
  updateEmployeeSchema,
} from "../validation/employee.schema";

const router = Router();

router.get("/", employeeController.getAll);
router.get("/:id", employeeController.getById);
router.post("/", validateBody(createEmployeeSchema), employeeController.create);
router.put("/:id", validateBody(updateEmployeeSchema), employeeController.update);
router.delete("/:id", employeeController.remove);

export default router;
