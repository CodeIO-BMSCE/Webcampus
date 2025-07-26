import courseAssignmentRouter from "@webcampus/api/src/routers/hod/course-assignment.router";
import { Router } from "express";

const router = Router();

router.use("/course-assignment", courseAssignmentRouter);

export default router;
