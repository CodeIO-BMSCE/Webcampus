import "dotenv/config";
import DepartmentRouter from "@webcampus/api/routers/department/department.router";
import { auth, toNodeHandler } from "@webcampus/auth";
import { protect } from "@webcampus/backend-utils/middlewares";
import { backendEnv } from "@webcampus/common/env";
import cors from "cors";
import express from "express";
import semesterRouter from "./routers/admin/semester.router";
import courseAssignmentRouter from "./routers/course-assignment.router";
import courseRegistrationRouter from "./routers/course-registration.router";
import facultyRouter from "./routers/faculty.router";
import sectionRouter from "./routers/section.router";
import userRouter from "./routers/user.router";

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
