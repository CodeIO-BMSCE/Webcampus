import { Router } from "express";
import {
  getFrozenData,
  getFinalLockedData
} from "../../controllers/coe/coe.controller";

const router = Router();

router.get("/frozen-data", getFrozenData);
router.get("/final-locked", getFinalLockedData);

export default router;
