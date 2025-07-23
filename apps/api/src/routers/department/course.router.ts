import { CourseController } from "@webcampus/api/src/controllers/department/course.controller";
import { protect, validateRequest } from "@webcampus/backend-utils/middlewares";
import { StringParamSchema } from "@webcampus/schemas/common";
import { CreateCourseSchema } from "@webcampus/schemas/department";
import { Router } from "express";

const router = Router();

router.post(
  "/",
  validateRequest(CreateCourseSchema),
  protect({
    role: "department",
    permissions: {
      courses: ["create"],
    },
  }),
  CourseController.create
);

router.get(
  "/branch",
  validateRequest(StringParamSchema, "query"),
  protect({
    role: "department",
    permissions: {
      courses: ["read"],
    },
  }),
  CourseController.getCoursesByBranch
);

export default router;
