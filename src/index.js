import express from "express";
import '../config.js'; //Para que tome las variables de entorno del .env si no no se estaria conectand a la bd

import comerciosRoute from "./routes/comercios.routes.js";
import denunciasRoute from "./routes/denuncias.routes.js";
import notificaciones from "./routes/notificaciones.routes.js";
import reclamosRoute from "./routes/reclamos.routes.js";
import serviciosRoute from "./routes/servicios.routes.js";
import userInspectorRoute from "./routes/userInspector.routes.js";
import userVecinoRoute from "./routes/userVecino.routes.js";

const PORT = process.env.PORT || 4000;

const app = express()
app.use(express.json())

app.use("/api/userVecino", userVecinoRoute)
app.use("/api/servicios", serviciosRoute)
app.use("/api/reclamos", reclamosRoute)
app.use("/api/comercios", comerciosRoute)
app.use("/api/denuncias", denunciasRoute)
app.use("/api/userInspector", userInspectorRoute)
app.use("/api/notificaciones", notificaciones)

app.listen(PORT);
console.log("Server on port", PORT);