import {  getComercioById, getComercios, habilitarComercio, postComercio, getPrimerImagen, getImagenes } from "../controllers/comercios.controller.js";
import { Router } from "express";
import {upload} from '../middlewares/multerConfigComercios.js'; 

const router = Router()

router.post("/post", upload.array('imagenes', 7), postComercio)
router.get("/getComercios", getComercios)
router.get("/getComercioById/:idComercio", getComercioById)
router.put("/habilitar/:idComercio", habilitarComercio)
router.get("/getPrimerImagen/:idComercio", getPrimerImagen)
router.get("/getImagenes/:idComercio/:numeroImagen", getImagenes)


export default router