import { Router } from "express";
import  {postReclamo, getReclamos, getReclamoById, getReclamoParcialById, getReclamosByVecino, getReclamosByInspector, getReclamosByRubro, cambiarEstadoReclamo, getMovimientosReclamo, postMovimientoReclamo, unificarReclamos, getPrimerImagen, getImagenes} from "../controllers/reclamos.controller.js";
import {upload} from '../middlewares/multerConfigReclamos.js'; 
import {authMiddleware} from '../middlewares/auth.js'; 

const router = Router()

router.post("/post", authMiddleware, upload.array('imagenes', Infinity),  postReclamo) 
//inspector tiene que poder cargar imagenes sin limite
router.get("/getReclamos", getReclamos)
router.get("/getReclamoById/:idReclamo", getReclamoById)
router.get("/getReclamoParcialById/:idReclamo", getReclamoParcialById)
router.get("/getReclamosByVecino/:documento", getReclamosByVecino)
router.get("/getReclamosByInspector/:legajo", getReclamosByInspector)
router.get("/getReclamosByRubro/:idRubro", getReclamosByRubro)
router.patch("/cambiarEstadoReclamo/:idReclamo", cambiarEstadoReclamo)
router.get("/getMovimientosReclamo/:idReclamo", getMovimientosReclamo)
router.post("/postMovimientoReclamo/:idReclamo", postMovimientoReclamo)
router.patch("/unificarReclamos", unificarReclamos)
router.get("/getPrimerImagen/:idReclamo", getPrimerImagen)
router.get("/getImagenes/:idReclamo/:numeroImagen", getImagenes)

export default router