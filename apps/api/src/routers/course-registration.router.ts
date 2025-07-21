import { protect, validateRequest } from "@webcampus/backend-utils/middlewares";
import {
  createCourseRegistrationSchema,
  updateCourseRegistrationSchema,
} from "@webcampus/schemas";
import { Router } from "express";
import {
  createCourseRegistration,
  deleteCourseRegistration,
  getAllCourseRegistrations,
  getCourseRegistrationById,
  getCourseRegistrationsByStudentId,
  updateCourseRegistration,
} from "../controllers/course-registration.controller";

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
  validateRequest(createCourseRegistrationSchema),
  createCourseRegistration
);
router.get("/", getAllCourseRegistrations);
router.get("/:id", getCourseRegistrationById);
router.get("/student/:studentId", getCourseRegistrationsByStudentId);
router.put(
  "/:id",
  validateRequest(updateCourseRegistrationSchema),
  updateCourseRegistration
);
router.delete("/:id", deleteCourseRegistration);

export default router;
