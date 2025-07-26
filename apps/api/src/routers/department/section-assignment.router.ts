import {
  createSectionAssignment,
  deleteSectionAssignment,
  getAllSectionAssignments,
  getSectionAssignmentById,
  getSectionAssignmentsBySectionId,
  updateSectionAssignment,
} from "@webcampus/api/src/controllers/department/section-assignment.controller";
import { validateRequest } from "@webcampus/backend-utils/middlewares";
import {
  createSectionAssignmentSchema,
  updateSectionAssignmentSchema,
} from "@webcampus/schemas/department";
import { Router } from "express";

const router = Router();

router.post(
  "/",
  validateRequest(createSectionAssignmentSchema),
  createSectionAssignment
);
router.get("/", getAllSectionAssignments);
router.get("/:id", getSectionAssignmentById);
router.get("/section/:sectionId", getSectionAssignmentsBySectionId);
router.put(
  "/:id",
  validateRequest(updateSectionAssignmentSchema),
  updateSectionAssignment
);
router.delete("/:id", deleteSectionAssignment);

export default router;
