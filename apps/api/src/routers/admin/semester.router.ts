import { protect, validateRequest } from "@webcampus/backend-utils/middlewares";
import { CreateSemesterSchema } from "@webcampus/schemas/admin";
import { Router } from "express";
import { SemesterController } from "../../controllers/admin/semester.controller";

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
