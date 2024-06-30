import { Router } from "express";
import { getNotificacionesVecino } from "../controllers/notificaciones.controller.js";
import {authMiddleware} from '../middlewares/auth.js'; 

const router = Router()


router.get("/vecino/:documento", getNotificacionesVecino)

export default router