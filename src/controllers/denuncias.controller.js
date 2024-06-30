import denuncias from '../services/denuncias.service.js';

const postDenuncia = async (req, res) => {
    console.log(req.body)
    try {
        const {documento, idSitio, descripcion, aceptaResponsabilidad, idDenunciaPruebas, nombre, direccion, ubicacionHecho} = req.body
        const response = await denuncias.postDenuncia(documento, parseInt(idSitio), descripcion, parseInt(aceptaResponsabilidad), idDenunciaPruebas, nombre, direccion, ubicacionHecho)
        res.status(201).send(response)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
}

const getDenuncias = async (req, res) => {
    try {
        const response = await denuncias.getDenuncias()
        res.status(200).send(response)
    } catch (error) {
        res.status(400).send(error)
    }
}


const getDenunciaParcialById = async (req, res) => {
    try {
        const idDenuncia = parseInt(req.params.idDenuncia)
        const response = await denuncias.getDenunciaParcialById(idDenuncia)
        res.status(200).send(response)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
}


const getDenunciaById = async (req, res) => {
    try {
        const idDenuncia = parseInt(req.params.idDenuncia)
        const response = await denuncias.getDenunciaById(idDenuncia)
        res.status(200).send(response)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
}


const getDenunciasByVecino = async (req, res) => {
    try {
        const documento = req.params.documento
        const response = await denuncias.getDenunciasByVecino(documento)
        res.status(200).send(response)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
}


//Endpoints dedicados al uso del municipio

const cambiarEstadoDenuncia = async (req, res) => {
    try {
        const idDenuncia = parseInt(req.params.idDenuncia)
        const { nuevoEstado } = req.body
        
        const estados = ["Abierto", "En proceso", "Cerrado"]
        if (!estados.includes(nuevoEstado)) {
            res.status(400).send("Los estados deben ser: Abierto, En proceso o Cerrado.")
        }
        else{
            const response = await denuncias.cambiarEstadoDenuncia(idDenuncia, nuevoEstado)
            res.status(200).send(response)
        }
    } catch (error) {
        console.log(error)
        res.status(304).send(error)
    }
}


//El municipio deriva la denuncia al deartamento legal en primera instancia, ellos actualizan y se registra en movimientosDenuncia
const postMovimientoDenuncia = async (req, res) => {
    try {
        const idDenuncia = parseInt(req.params.idDenuncia)

        const estadoDenuncia = await denuncias.getEstadoDenuncia(idDenuncia)
        if (estadoDenuncia.estado == "Cerrado") {
            res.status(400).send("No se puede derivar una denuncia cerrado")
        }
        else{
            const { responsable, causa } = req.body
            const response = await denuncias.postMovimientoDenuncia(idDenuncia, responsable, causa)
            res.status(201).send(response)
        }
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
}

//Manejo de imagenes
const getPrimerImagen = async (req, res) => {
    try {
      const idDenuncia = parseInt(req.params.idDenuncia)
      const response = await denuncias.getPrimerImagen(idDenuncia)
      res.status(200).sendFile(response)
    } catch (error) {
          res.send(error)
    }
  }
  
const getImagenes = async (req, res) => {
    try {
        const idDenuncia = parseInt(req.params.idDenuncia)
        const numeroImagen = parseInt(req.params.numeroImagen)
        const response = await denuncias.getImagenes(idDenuncia, numeroImagen)
        res.status(200).sendFile(response)
    } catch (error) {
            res.status(400).send("No se ha encontrado una imagen con esas caracterisicas.")
    }
}

//Manejo de archivos
const getZipArchivos = async (req, res) => {
    try {
        const idDenuncia = parseInt(req.params.idDenuncia)
        const response = await denuncias.getZipArchivos(idDenuncia)
        res.status(200).sendFile(response)
     } catch (error) {
              res.status(400).send("No se ha encontrado una zip con esas caracterisicas.")
    }
}



export {postDenuncia, getDenuncias, getDenunciaParcialById, getDenunciaById, getDenunciasByVecino, cambiarEstadoDenuncia, postMovimientoDenuncia, getPrimerImagen, getImagenes, getZipArchivos}
