import {
  createMark,
  deleteMark,
  getAllMarks,
  getMarkById,
  getMarkByStudentAndCourse,
  updateMark,
} from "@webcampus/api/src/controllers/faculty/mark.controller";
import { protect, validateRequest } from "@webcampus/backend-utils/middlewares";
import { createMarkSchema, updateMarkSchema } from "@webcampus/schemas/faculty";
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

router.post("/", validateRequest(createMarkSchema), createMark);
router.get("/", getAllMarks);
router.get("/:id", getMarkById);
router.get("/student/:studentId/course/:courseId", getMarkByStudentAndCourse);
router.put("/:id", validateRequest(updateMarkSchema), updateMark);
router.delete("/:id", deleteMark);

export default router;
