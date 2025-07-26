import {
  createSection,
  deleteSection,
  getAllSections,
  getSectionById,
} from "@webcampus/api/src/controllers/department/section.controller";
import { protect, validateRequest } from "@webcampus/backend-utils/middlewares";
import {
  CreateSectionSchema,
  SectionQuerySchema,
} from "@webcampus/schemas/department";
import { Router } from "express";

const router = Router();

router.post(
  "/",
  validateRequest(CreateSectionSchema),
  protect({
    role: "department",
    permissions: {
      section: ["create"],
    },
  }),
  createSection
);

router.get(
  "/",
  validateRequest(SectionQuerySchema, "query"),
  protect({
    role: "department",
    permissions: {
      section: ["read"],
    },
  }),
  getAllSections
);

router.get("/:id", getSectionById);

router.delete("/:id", deleteSection);

export default router;
