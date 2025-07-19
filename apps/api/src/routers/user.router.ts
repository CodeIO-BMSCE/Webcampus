import { validateRequest } from "@webcampus/backend-utils/middlewares";
import { createUserSchema } from "@webcampus/schemas";
import { Router } from "express";
import { createUser } from "../controllers/user.controller";

const router = Router();

router.post("/", validateRequest(createUserSchema), createUser);

export default router;
