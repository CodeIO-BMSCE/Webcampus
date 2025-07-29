import { CourseRegistrationController } from "@webcampus/api/src/controllers/student/course-registration.controller";
import { validateRequest } from "@webcampus/backend-utils/middlewares";
import {
  createCourseRegistrationSchema,
  updateCourseRegistrationSchema,
} from "@webcampus/schemas/student";
import { Router } from "express";

const router = Router();

router.post(
  "/",
  validateRequest(createCourseRegistrationSchema),
  CourseRegistrationController.create
);
router.get("/", CourseRegistrationController.getAll);
router.get("/:id", CourseRegistrationController.getById);
router.get("/student/:studentId", CourseRegistrationController.getByStudentId);
router.put(
  "/:id",
  validateRequest(updateCourseRegistrationSchema),
  CourseRegistrationController.update
);
router.delete("/:id", CourseRegistrationController.delete);

export default router;
