import { Router } from "express";
import { postServicio, getServicios, getServicioById, getPrimerImagen, habilitar } from "../controllers/servicios.controller.js";
import {upload} from '../middlewares/multerConfigServicios.js'; 
import {authMiddleware} from '../middlewares/auth.js'; 

const router = Router()

router.post("/post", authMiddleware, upload.array('imagenes', 7), postServicio)
router.get("/getServicios", getServicios)
router.get("/getServicioById/:idServicio", getServicioById)
router.get("/getPrimerImagen/:idServicio", getPrimerImagen)
router.put("/habilitar/:idServicio", habilitar)
router.get("/getImagenes/:idServicio", )

export default router