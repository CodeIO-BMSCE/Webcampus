import DepartmentCourseRouter from "@webcampus/api/src/routers/department/course.router";
import DepartmentHODRouter from "@webcampus/api/src/routers/department/hod.router";
import DepartmentSectionRouter from "@webcampus/api/src/routers/department/section.router";
import { Router } from "express";

const router = Router();

router.use("/course", DepartmentCourseRouter);

router.use("/hod", DepartmentHODRouter);

router.use("/section", DepartmentSectionRouter);

export default router;
