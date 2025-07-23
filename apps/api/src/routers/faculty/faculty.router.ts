import {
  createFaculty,
  deleteFaculty,
  getAllFaculty,
  getFacultyById,
  updateFaculty,
} from "@webcampus/api/src/controllers/faculty/faculty.controller";
import { protect, validateRequest } from "@webcampus/backend-utils/middlewares";
import {
  createFacultySchema,
  updateFacultySchema,
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

router.post("/", validateRequest(createFacultySchema), createFaculty);
router.get("/", getAllFaculty);
router.get("/:id", getFacultyById);
router.put("/:id", validateRequest(updateFacultySchema), updateFaculty);
router.delete("/:id", deleteFaculty);

export default router;
