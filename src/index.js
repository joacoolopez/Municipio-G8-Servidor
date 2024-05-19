import express from "express";

import userVecinoRoute from "./routes/userVecino.routes.js"
import serviciosRoute from "./routes/servicios.routes.js"
const PORT = process.env.PORT || 4000;

const app = express()
app.use(express.json())

app.use("/api/userVecino", userVecinoRoute)
app.use("/api/servicios", serviciosRoute)

app.listen(PORT);
console.log("Server on port", PORT);