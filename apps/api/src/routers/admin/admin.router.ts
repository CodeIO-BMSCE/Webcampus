import DepartmentRouter from "@webcampus/api/src/routers/admin/department.router";
import { Router } from "express";

const router = Router();

router.use("/department", DepartmentRouter);

export default router;
