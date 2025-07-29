import { SectionAssignmentController } from "@webcampus/api/src/controllers/department/section-assignment.controller";
import { validateRequest } from "@webcampus/backend-utils/middlewares";
import {
  CreateSectionAssignmentSchema,
  UpdateSectionAssignmentSchema,
} from "@webcampus/schemas/department";
import { Router } from "express";

const router = Router();

router.post(
  "/",
  validateRequest(CreateSectionAssignmentSchema),
  SectionAssignmentController.create
);
router.get("/", SectionAssignmentController.getAll);
router.get("/:id", SectionAssignmentController.getById);
router.get("/section/:sectionId", SectionAssignmentController.getBySectionId);
router.put(
  "/:id",
  validateRequest(UpdateSectionAssignmentSchema),
  SectionAssignmentController.update
);
router.delete("/:id", SectionAssignmentController.delete);

export default router;
