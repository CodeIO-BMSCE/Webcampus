import "dotenv/config";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import cors from "cors";
import express from "express";
import { auth } from "../../../packages/auth/src/auth";

const app = express();

app.use(cors());

app.use(express.json());

app.all("/api/auth/", toNodeHandler(auth));

app.get("/api/me", async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  res.json(session);
});

export default app;
