import { CourseController } from "@/src/controllers/department/course.controller";
import { protect, validateRequest } from "@webcampus/backend-utils/middlewares";
import { ParamSchema } from "@webcampus/schemas/common";
import { CreateCourseSchema } from "@webcampus/schemas/department";
import { Router } from "express";

const router = Router();

const courseController = new CourseController();

router.use(
  protect({
    role: "department",
    permissions: {
      courses: ["create"],
    },
  })
);

router.post("/", validateRequest(CreateCourseSchema), courseController.create);

router.get(
  "/:id",
  validateRequest(ParamSchema),
  courseController.getCourseById
);

export default router;
