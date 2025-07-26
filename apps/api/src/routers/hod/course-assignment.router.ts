import {
  createCourseAssignment,
  deleteCourseAssignment,
  getAllCourseAssignments,
  getCourseAssignmentById,
  getCourseAssignmentsByFacultyId,
} from "@webcampus/api/src/controllers/hod/course-assignment.controller";
import { validateRequest } from "@webcampus/backend-utils/middlewares";
import { CreateCourseAssignmentSchema } from "@webcampus/schemas/hod";
import { Router } from "express";

const router = Router();

router.post(
  "/",
  validateRequest(CreateCourseAssignmentSchema),
  createCourseAssignment
);
router.get("/", getAllCourseAssignments);
router.get("/:id", getCourseAssignmentById);
router.get("/faculty/:facultyId", getCourseAssignmentsByFacultyId);
router.delete("/:id", deleteCourseAssignment);

export default router;
