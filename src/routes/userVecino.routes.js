import { Router } from "express";
import { generarClave, login, getHabilitado, getPasswordActiva } from "../controllers/userVecino.controller.js";

const router = Router()

router.put('/generarClave', generarClave)
router.post('/login', login)
router.get('/getHabilitado/:documento', getHabilitado)
router.get('/getPasswordActiva/:documento', getPasswordActiva)

export default router