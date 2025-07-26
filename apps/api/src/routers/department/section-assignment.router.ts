import {
  createSectionAssignment,
  deleteSectionAssignment,
  getAllSectionAssignments,
  getSectionAssignmentById,
  getSectionAssignmentsBySectionId,
  updateSectionAssignment,
} from "@webcampus/api/src/controllers/department/section-assignment.controller";
import { protect, validateRequest } from "@webcampus/backend-utils/middlewares";
import {
  createSectionAssignmentSchema,
  updateSectionAssignmentSchema,
} from "@webcampus/schemas/department";
import { Router } from "express";

const router = Router();

// Apply role-based protection
router.use(
  protect({
    role: "admin",
    permissions: {
      user: ["set-role"],
    },
  })
);
/* to be used when department sign-in is enabled*/
// router.use(
//   protect({
//     role: "department",
//     permissions: {
//       sectionAssignment: ["create", "read", "update", "delete"],
//     },
//   })
// );

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
