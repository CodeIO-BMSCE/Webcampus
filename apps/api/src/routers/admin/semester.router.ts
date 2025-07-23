import { SemesterController } from "@webcampus/api/src/controllers/admin/semester.controller";
import { protect, validateRequest } from "@webcampus/backend-utils/middlewares";
import { CreateSemesterSchema } from "@webcampus/schemas/admin";
import { Router } from "express";

const router = Router();
const semesterController = new SemesterController();

router.use(
  protect({
    role: "admin",
    permissions: {
      semester: ["create"],
    },
  })
);

router.post(
  "/",
  validateRequest(CreateSemesterSchema),
  semesterController.createSemester
);

export default router;
