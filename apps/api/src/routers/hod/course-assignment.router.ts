import {
  createCourseAssignment,
  deleteCourseAssignment,
  getAllCourseAssignments,
  getCourseAssignmentById,
  getCourseAssignmentsByFacultyId,
  updateCourseAssignment,
} from "@webcampus/api/src/controllers/hod/course-assignment.controller";
import { protect, validateRequest } from "@webcampus/backend-utils/middlewares";
import {
  createCourseAssignmentSchema,
  updateCourseAssignmentSchema,
} from "@webcampus/schemas/hod";
import { Router } from "express";

const router = Router();

// Apply role-based protection to all routes
router.use(
  protect({
    role: "admin",
    permissions: {
      user: ["set-role"],
    },
  })
);

router.post(
  "/",
  validateRequest(createCourseAssignmentSchema),
  createCourseAssignment
);
router.get("/", getAllCourseAssignments);
router.get("/:id", getCourseAssignmentById);
router.get("/faculty/:facultyId", getCourseAssignmentsByFacultyId);
router.put(
  "/:id",
  validateRequest(updateCourseAssignmentSchema),
  updateCourseAssignment
);
router.delete("/:id", deleteCourseAssignment);

export default router;
