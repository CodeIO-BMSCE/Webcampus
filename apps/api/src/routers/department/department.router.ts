import DepartmentCourseRouter from "@/src/routers/department/course.router";
import { verifySession } from "@webcampus/backend-utils/middlewares";
import { Router } from "express";

const router = Router();

router.use(verifySession);

router.use("/course", DepartmentCourseRouter);

export default router;
