import { Router } from "express";
import { generarClave, login, getHabilitado, getPasswordActiva, esVecino, solicitarClave, cambiarHabilitado, recuperarClave, cambiarClave } from "../controllers/userVecino.controller.js";

const router = Router()

router.put('/generarClave', generarClave)
router.post('/login', login)
router.get('/getHabilitado/:documento', getHabilitado)
router.get('/getPasswordActiva/:documento', getPasswordActiva)
router.get('/esVecino/:documento', esVecino)
router.post('/solicitarClave', solicitarClave)
router.put('/cambiarHabilitado', cambiarHabilitado)
router.post('/recuperarClave', recuperarClave)
router.patch('/cambiarClave', cambiarClave)


export default router