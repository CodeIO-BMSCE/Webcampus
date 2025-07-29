import { SectionController } from "@webcampus/api/src/controllers/department/section.controller";
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
  SectionController.create
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
  SectionController.getAll
);

router.get("/:id", SectionController.getById);

router.delete("/:id", SectionController.delete);

export default router;
