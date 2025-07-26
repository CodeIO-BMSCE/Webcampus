import {
  createAttendance,
  deleteAttendance,
  getAllAttendances,
  getAttendanceById,
  getAttendanceByStudentAndCourse,
  updateAttendance,
} from "@webcampus/api/src/controllers/faculty/attendance.controller";
import { protect, validateRequest } from "@webcampus/backend-utils/middlewares";
import {
  createAttendanceSchema,
  updateAttendanceSchema,
} from "@webcampus/schemas/faculty";
import { Router } from "express";

const router = Router();

router.use(
  protect({
    role: "faculty",
    permissions: {
      user: ["set-role"],
    },
  })
);

router.post("/", validateRequest(createAttendanceSchema), createAttendance);
router.get("/", getAllAttendances);
router.get("/:id", getAttendanceById);
router.get(
  "/student/:studentId/course/:courseId",
  getAttendanceByStudentAndCourse
);
router.put("/:id", validateRequest(updateAttendanceSchema), updateAttendance);
router.delete("/:id", deleteAttendance);

export default router;
