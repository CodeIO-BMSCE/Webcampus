import { FacultyController } from "@webcampus/api/src/controllers/faculty/faculty.controller";
import { protect, validateRequest } from "@webcampus/backend-utils/middlewares";
import {
  CreateFacultySchema,
  UpdateFacultySchema,
} from "@webcampus/schemas/faculty";
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

router.post(
  "/",
  validateRequest(CreateFacultySchema),
  FacultyController.create
);
router.get("/", FacultyController.getAll);
router.get("/:id", FacultyController.getById);
router.put(
  "/:id",
  validateRequest(UpdateFacultySchema),
  FacultyController.update
);
router.delete("/:id", FacultyController.delete);

export default router;
