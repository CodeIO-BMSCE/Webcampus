import "dotenv/config"
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.send({
        message: "Server is Up and Running"
    })
})

export default app;