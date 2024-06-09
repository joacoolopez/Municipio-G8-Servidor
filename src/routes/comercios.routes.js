import { postComercio } from ".../controllers/comercios.controller.js";
import { Router } from "express";
import { habilitar } from "../controllers/servicios.controller";

const router = Router()

router.post("/post", postComercio)
router.get("/getComercios", getComercios)
router.get("/getComercioById/:idComercio", getComercioById)
router.put("/habilitar/:idComercio", habilitar)

export default router