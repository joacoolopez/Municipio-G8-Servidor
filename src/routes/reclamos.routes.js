import { Router } from "express";
import { cambiarEstadoReclamo, getDesperfectos, getImagenes, getMovimientosReclamo, getPrimerImagen, getReclamoById, getReclamoParcialById, getReclamos, getReclamosByInspector, getReclamosByRubro, getReclamosByVecino, getRubros, getSitios, postMovimientoReclamo, postReclamo, unificarReclamos } from "../controllers/reclamos.controller.js";
import { authMiddleware } from '../middlewares/auth.js';
import { upload } from '../middlewares/multerConfigReclamos.js';

const router = Router()

router.post("/post", authMiddleware, upload.array('imagenes', 7),  postReclamo) 
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
router.get("/getSitios", getSitios)
router.get("/getRubros", getRubros)
router.get("/getDesperfectos", getDesperfectos)

export default router