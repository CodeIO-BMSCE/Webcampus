import "dotenv/config";
import DepartmentRouter from "@webcampus/api/src/routers/department/department.router";
import attendanceRouter from "@webcampus/api/src/routers/faculty/attendance.router";
import markRouter from "@webcampus/api/src/routers/faculty/mark.router";
import { auth, toNodeHandler } from "@webcampus/auth";
import { backendEnv } from "@webcampus/common/env";
import cors from "cors";
import express from "express";
import adminRouter from "./routers/admin/admin.router";
import hodRouter from "./services/hod/hod.router";

const app = express();

app.use(
  cors({
    origin: backendEnv().FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.all("/api/auth/{*any}", toNodeHandler(auth));
/**
 * Mount express json middleware after Better Auth handler
 **/
app.use(express.json());

app.use("/admin", adminRouter);

app.use("/hod", hodRouter);

app.use("/department", DepartmentRouter);

app.use("/api/mark", markRouter);

app.use("/api/attendance", attendanceRouter);

app.get("/", (req, res) => {
  res.send({
    message: "Server is Up and Running",
  });
});

export default app;
