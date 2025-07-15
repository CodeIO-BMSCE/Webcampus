import "dotenv/config";
import { auth, toNodeHandler } from "@webcampus/auth";
import { backendEnv } from "@webcampus/common/env";
import cors from "cors";
import express from "express";

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

app.get("/", (req, res) => {
  res.send({
    message: "Server is Up and Running",
  });
});

export default app;
