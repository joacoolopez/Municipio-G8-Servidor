import { Router } from "express";
import {postDenuncia, getDenuncias, getDenunciaParcialById, getDenunciaById, getDenunciasByVecino, cambiarEstadoDenuncia, postMovimientoDenuncia, getPrimerImagen, getImagenes, getZipArchivos} from '../controllers/denuncias.controller.js'
import { upload, crearZip } from '../middlewares/multerConfigDenuncias.js'
import {authMiddleware} from '../middlewares/auth.js'; 

const router = Router()

router.post("/post", authMiddleware, upload.array('files'), async (req, res, next) => {
    try {
      await crearZip(req.body.idDenunciaPruebas);
      await postDenuncia(req, res, next);
    } catch (error) {
      next(error);
    }
  });

router.get("/getDenuncias", getDenuncias)
router.get("/getDenunciaById/:idDenuncia", getDenunciaById)
router.get("/getDenunciaParcialById/:idDenuncia", getDenunciaParcialById)
router.get("/getDenunciasByVecino/:documento", getDenunciasByVecino)
router.patch("/cambiarEstadoDenuncia/:idDenuncia", cambiarEstadoDenuncia)
router.post("/postMovimientoDenuncia/:idDenuncia", postMovimientoDenuncia)
router.get("/getPrimerImagen/:idDenuncia", getPrimerImagen)
router.get("/getImagenes/:idDenuncia/:numeroImagen", getImagenes)
router.get("/getZipArchivos/:idDenuncia", getZipArchivos)

export default router
