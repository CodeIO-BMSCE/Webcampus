import { validateRequest } from "@webcampus/backend-utils/middlewares";
import { createUserSchema } from "@webcampus/schemas";
import { Router } from "express";
import { createUser, deleteUser } from "../controllers/user.controller";

const router = Router();

router.post("/", validateRequest(createUserSchema), createUser);

router.delete("/", deleteUser);

export default router;
