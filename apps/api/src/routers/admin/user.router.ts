import {
  createUser,
  deleteUser,
} from "@webcampus/api/src/controllers/admin/user.controller";
import { validateRequest } from "@webcampus/backend-utils/middlewares";
import { createUserSchema } from "@webcampus/schemas/admin";
import { Router } from "express";

const router = Router();

router.post("/", validateRequest(createUserSchema), createUser);

router.delete("/", deleteUser);

export default router;
