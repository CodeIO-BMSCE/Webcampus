import { HODController } from "@webcampus/api/src/controllers/department/hod.controller";
import { protect, validateRequest } from "@webcampus/backend-utils/middlewares";
import { StringParamSchema } from "@webcampus/schemas/common";
import { CreateHODSchema } from "@webcampus/schemas/department";
import { Router } from "express";

const router = Router();

router.post(
  "/",
  validateRequest(CreateHODSchema),
  protect({
    role: "department",
    permissions: {
      hod: ["create"],
      user: ["set-role"],
    },
  }),
  HODController.create
);

router.get(
  "/",
  validateRequest(StringParamSchema, "query"),
  protect({
    role: "department",
    permissions: {
      hod: ["read"],
    },
  }),
  HODController.get
);

export default router;
