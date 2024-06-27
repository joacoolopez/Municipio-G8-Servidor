import { Router } from "express";
import {postDenuncia, getDenuncias, getDenunciaParcialById, getDenunciaById, getDenunciasByVecino, cambiarEstadoDenuncia} from '../controllers/denuncias.controller.js'

const router = Router()

router.post("/post", postDenuncia) 
//inspector tiene que poder cargar imagenes sin limite
router.get("/getDenuncias", getDenuncias)
router.get("/getDenunciaById/:idDenuncia", getDenunciaById)
router.get("/getDenunciaParcialById/:idDenuncia", getDenunciaParcialById)
router.get("/getDenunciasByVecino/:documento", getDenunciasByVecino)
router.patch("/cambiarEstadoDenuncia/:idDenuncia", cambiarEstadoDenuncia)

export default router
