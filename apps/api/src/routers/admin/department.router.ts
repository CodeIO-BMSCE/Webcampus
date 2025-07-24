import { DepartmentController } from "@webcampus/api/src/controllers/admin/department.controller";
import { protect, validateRequest } from "@webcampus/backend-utils/middlewares";
import { createUserSchema } from "@webcampus/schemas/admin";
import { CreateDepartmentSchema } from "@webcampus/schemas/department";
import { Router } from "express";

const router = Router();

router.post(
  "/",
  validateRequest(CreateDepartmentSchema.extend(createUserSchema.shape)),
  protect({
    role: "admin",
    permissions: {
      user: ["set-role"],
      department: ["create"],
    },
  }),
  DepartmentController.create
);

router.get(
  "/",
  protect({
    role: "admin",
    permissions: {
      department: ["read"],
    },
  }),
  DepartmentController.getDepartments
);

export default router;
