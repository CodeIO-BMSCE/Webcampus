import DepartmentRouter from "@webcampus/api/src/routers/admin/department.router";
import UserRouter from "@webcampus/api/src/routers/admin/user.router";
import { Router } from "express";

const router = Router();

router.use("/user", UserRouter);

router.use("/department", DepartmentRouter);

export default router;
