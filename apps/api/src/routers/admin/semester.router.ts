import { SemesterController } from "@webcampus/api/src/controllers/admin/semester.controller";
import { protect, validateRequest } from "@webcampus/backend-utils/middlewares";
import { CreateSemesterSchema } from "@webcampus/schemas/admin";
import { UUIDSchema } from "@webcampus/schemas/common";
import { Router } from "express";

const router = Router();

router.post(
  "/",
  validateRequest(CreateSemesterSchema),
  protect({
    role: "admin",
    permissions: {
      semester: ["create"],
    },
  }),
  SemesterController.create
);

router.delete(
  "/",
  validateRequest(UUIDSchema),
  protect({
    role: "admin",
    permissions: { semester: ["delete"] },
  }),
  SemesterController.delete
);

router.get(
  "/",
  protect({
    permissions: { semester: ["read"] },
  }),
  SemesterController.getAll
);

export default router;
