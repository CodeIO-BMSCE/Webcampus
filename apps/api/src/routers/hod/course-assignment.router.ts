import { CourseAssignmentController } from "@webcampus/api/src/controllers/hod/course-assignment.controller";
import { validateRequest } from "@webcampus/backend-utils/middlewares";
import { CreateCourseAssignmentSchema } from "@webcampus/schemas/hod";
import { Router } from "express";

const router = Router();

router.post(
  "/",
  validateRequest(CreateCourseAssignmentSchema),
  CourseAssignmentController.create
);
router.get("/", CourseAssignmentController.getAll);
router.get("/:id", CourseAssignmentController.getById);
router.get("/faculty/:facultyId", CourseAssignmentController.getByFacultyId);
router.delete("/:id", CourseAssignmentController.delete);

export default router;
