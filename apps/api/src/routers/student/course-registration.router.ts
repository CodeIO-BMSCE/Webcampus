import {
  createCourseRegistration,
  deleteCourseRegistration,
  getAllCourseRegistrations,
  getCourseRegistrationById,
  getCourseRegistrationsByStudentId,
  updateCourseRegistration,
} from "@webcampus/api/src/controllers/student/course-registration.controller";
import { protect, validateRequest } from "@webcampus/backend-utils/middlewares";
import {
  createCourseRegistrationSchema,
  updateCourseRegistrationSchema,
} from "@webcampus/schemas/student";
import { Router } from "express";

const router = Router();

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
