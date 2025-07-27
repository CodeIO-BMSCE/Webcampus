import { AttendanceController } from "@webcampus/api/src/controllers/faculty/attendance.controller";
import { validateRequest } from "@webcampus/backend-utils/middlewares";
import {
  CreateAttendanceSchema,
  UpdateAttendanceSchema,
} from "@webcampus/schemas/faculty";
import { Router } from "express";

const router = Router();

router.post(
  "/",
  validateRequest(CreateAttendanceSchema),
  AttendanceController.create
);
router.get("/", AttendanceController.getAll);
router.get("/:id", AttendanceController.getById);
router.get(
  "/student/:studentId/course/:courseId",
  AttendanceController.getByStudentAndCourse
);
router.put(
  "/:id",
  validateRequest(UpdateAttendanceSchema),
  AttendanceController.update
);
router.delete("/:id", AttendanceController.delete);

export default router;
