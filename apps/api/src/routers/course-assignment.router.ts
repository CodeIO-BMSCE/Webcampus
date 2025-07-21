import { protect, validateRequest } from "@webcampus/backend-utils/middlewares";
import {
  createCourseAssignmentSchema,
  updateCourseAssignmentSchema,
} from "@webcampus/schemas";
import { Router } from "express";
import {
  createCourseAssignment,
  deleteCourseAssignment,
  getAllCourseAssignments,
  getCourseAssignmentById,
  getCourseAssignmentsByFacultyId,
  updateCourseAssignment,
} from "../controllers/course-assignment.controller";

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
