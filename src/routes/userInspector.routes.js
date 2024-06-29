import { Router } from "express";
import {login, recuperarClave, cambiarClave } from "../controllers/userInspector.controller.js";

const router = Router()

router.post('/login', login)
router.post('/recuperarClave', recuperarClave)
router.patch('/cambiarClave', cambiarClave)


export default router