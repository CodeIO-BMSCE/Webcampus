import DepartmentRouter from "@webcampus/api/src/routers/admin/department.router";
import SemesterRouter from "@webcampus/api/src/routers/admin/semester.router";
import UserRouter from "@webcampus/api/src/routers/admin/user.router";
import { Router } from "express";

const router = Router();

router.use("/user", UserRouter);

router.use("/department", DepartmentRouter);

router.use("/semester", SemesterRouter);

export default router;
