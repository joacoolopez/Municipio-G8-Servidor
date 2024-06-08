import { Router } from "express";
import  {postReclamo, getReclamos, getReclamoById, getReclamoParcialById, getReclamosByVecino, getReclamosByInspector, getReclamosByRubro, cambiarEstadoReclamo, getMovimientosReclamo, postMovimientoReclamo, unificarReclamos} from "../controllers/reclamos.controller.js";

const router = Router()

router.post("/post", postReclamo)
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

export default router