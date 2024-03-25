import express from "express";

import userVecinoRoute from "./routes/userVecino.routes.js"

const app = express()
app.use(express.json())

app.use("/api/userVecino", userVecinoRoute)

app.listen(3000);
console.log("Server on port", 3000);