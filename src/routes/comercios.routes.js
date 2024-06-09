import { postComercio } from ".../controllers/comercios.controller.js";
import { Router } from "express";

const router = Router()

router.post("/post", postComercio)
router.get("/getComercios", getComercios)
router.get("/getComercioById/:idComercio", getComercioById)
router.put("/habilitar/:idComercio", habilitarComercio)

export default router