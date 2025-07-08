import "dotenv/config";
import cors from "cors";
import express from "express";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send({
    message: "Server is Up and Running",
  });
});

export default app;
