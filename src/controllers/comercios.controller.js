import { compare } from "bcrypt";
import comercios from "../services/comercios.service.js";

const postComercio = async (req, res) => {
    try {

        const {documentoVecino, nombreComercio, descripcion, direccion, contacto, idComercio} = req.body
        console.log({documentoVecino, nombreComercio, descripcion, direccion, contacto, idComercio})
        const response = await comercios.postComercio(documentoVecino, nombreComercio, descripcion, direccion, contacto, idComercio) 
        res.status(201).send(response)
    }catch (error){
        console.log(error)
        res.status(400).send(error)
    }
}

const getComercios = async (req, res) => {
    try{
        const response = await comercios.getComercios()
        res.status(200).send(response)
    }catch (error){
        res.status(400).send({ error: "Hubo un error al procesar la solicitud." })
    }
}

const getComercioById = async (req, res) => {
    try{
        const idComercio = req.params.idComercio
        const response = await comercios.getComercioById(idComercio)
        res.status(200).send(response)
    }catch(error){
        res.status(400).send(error)
    }
}

const habilitarComercio = async (req, res) => {
    try{
        const idComercio = req.params.idComercio
        const response = await comercios.habilitar(idComercio)
        res.send(response)
    } catch(error){
        res.send(error)
    }
}

const getPrimerImagen = async (req, res) => {
    try {
      const idComercio = req.params.idComercio
      console.log(idComercio)
      const response = await comercios.getPrimerImagen(idComercio)
      res.sendFile(response)
    } catch (error) {
        console.log(error)
          res.send(error)
    }
  }

  const getImagenes = async (req, res) => {
    try {
      const idComercio = req.params.idComercio
      const numeroImagen = req.params.numeroImagen
      const response = await comercios.getImagenes(idComercio, numeroImagen)
      res.sendFile(response)
    } catch (error) {
        console.log(error)
          res.send(error)
    }
  }

export { getComercioById, getComercios, habilitarComercio, postComercio, getPrimerImagen, getImagenes };

