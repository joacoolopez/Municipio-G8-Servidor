import denuncias from '../services/denuncias.service.js';

const postDenuncia = async (req, res) => {
    try {
        const {documento, idSitio, descripcion, aceptaResponsabilidad} = req.body
        const response = await denuncias.postDenuncia(documento, parseInt(idSitio), descripcion, parseInt(aceptaResponsabilidad))
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




export {postDenuncia, getDenuncias, getDenunciaParcialById, getDenunciaById, getDenunciasByVecino, cambiarEstadoDenuncia}
