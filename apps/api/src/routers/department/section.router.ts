import {
  createSection,
  deleteSection,
  getAllSections,
  getSectionById,
  getSectionsByBranchId,
  updateSection,
} from "@webcampus/api/src/controllers/department/section.controller";
import { protect, validateRequest } from "@webcampus/backend-utils/middlewares";
import {
  createSectionSchema,
  updateSectionSchema,
} from "@webcampus/schemas/department";
import { Router } from "express";

const router = Router();

// Apply role-based protection to all routes
router.use(
  protect({
    role: "admin",
    permissions: {
      user: ["set-role"],
    },
  })
);

router.post("/", validateRequest(createSectionSchema), createSection);
router.get("/", getAllSections);
router.get("/:id", getSectionById);
router.get("/branch/:branchId", getSectionsByBranchId);
router.put("/:id", validateRequest(updateSectionSchema), updateSection);
router.delete("/:id", deleteSection);

export default router;
