import "dotenv/config";
import semesterRouter from "@webcampus/api/src/routers/admin/semester.router";
import userRouter from "@webcampus/api/src/routers/admin/user.router";
import DepartmentRouter from "@webcampus/api/src/routers/department/department.router";
import sectionRouter from "@webcampus/api/src/routers/department/section.router";
import facultyRouter from "@webcampus/api/src/routers/faculty/faculty.router";
import courseAssignmentRouter from "@webcampus/api/src/routers/hod/course-assignment.router";
import courseRegistrationRouter from "@webcampus/api/src/routers/student/course-registration.router";
import { auth, toNodeHandler } from "@webcampus/auth";
import { protect } from "@webcampus/backend-utils/middlewares";
import { backendEnv } from "@webcampus/common/env";
import cors from "cors";
import express from "express";
import adminRouter from "./routers/admin/admin.router";

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

app.use(
  "/user",
  protect({
    role: "admin",
    permissions: {
      user: ["set-role"],
    },
  }),
  userRouter
);

app.use("/api/faculty", facultyRouter);

app.use("/api/course-registration", courseRegistrationRouter);

app.use("/api/course-assignment", courseAssignmentRouter);

app.use("/api/sections", sectionRouter);

app.use("/semester", semesterRouter);

app.use("/department", DepartmentRouter);

app.get("/", (req, res) => {
  res.send({
    message: "Server is Up and Running",
  });
});

export default app;
