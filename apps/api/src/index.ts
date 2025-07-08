import app from "./app.js";
import { API_CONSTANTS } from "./constants/api-constants.js";

app.listen(API_CONSTANTS.DEV.PORT, () => {
    console.log(`API Server is running on http://localhost:${API_CONSTANTS.DEV.PORT}`)
})