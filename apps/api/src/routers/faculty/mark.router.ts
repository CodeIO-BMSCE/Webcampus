import { MarkController } from "@webcampus/api/src/controllers/faculty/mark.controller";
import { validateRequest } from "@webcampus/backend-utils/middlewares";
import { CreateMarkSchema, UpdateMarkSchema } from "@webcampus/schemas/faculty";
import { Router } from "express";

const router = Router();

router.post("/", validateRequest(CreateMarkSchema), MarkController.create);
router.get("/", MarkController.getAll);
router.get("/:id", MarkController.getById);
router.get(
  "/student/:studentId/course/:courseId",
  MarkController.getByStudentAndCourse
);
router.put("/:id", validateRequest(UpdateMarkSchema), MarkController.update);
router.delete("/:id", MarkController.delete);

export default router;
