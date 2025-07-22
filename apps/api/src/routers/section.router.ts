import { protect, validateRequest } from "@webcampus/backend-utils/middlewares";
import { createSectionSchema, updateSectionSchema } from "@webcampus/schemas";
import { Router } from "express";
import {
  createSection,
  deleteSection,
  getAllSections,
  getSectionById,
  getSectionsByBranchId,
  updateSection,
} from "../controllers/section.controller";

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
