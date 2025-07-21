import { backendEnv } from "@webcampus/common/env";
import app from "./app.js";

app.listen(backendEnv().PORT, () => {
  console.log(`API Server is running on http://localhost:${backendEnv().PORT}`);
});
