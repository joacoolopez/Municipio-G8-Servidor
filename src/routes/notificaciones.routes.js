import { Router } from "express";
import { getNotificacionesVecino, getNotificacionesInspector } from "../controllers/notificaciones.controller.js";
import {authMiddleware} from '../middlewares/auth.js'; 

const router = Router()


router.get("/vecino/:documento", getNotificacionesVecino)
router.get("/inspector/:legajo", getNotificacionesInspector)

export default router