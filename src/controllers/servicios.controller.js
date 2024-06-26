import servicios from "../services/servicios.service.js";
import { v4 as uuidv4 } from 'uuid';

const postServicio = async (req, res) => {
    try {
      
        const documento = req.documento
        
        //const idServicio = uuidv4()
        const {tituloServicio, direccion, telefono, horaApertura, minutoApertura, horaCierre, minutoCierre, rubro, descripcion, idServicio} = req.body
        console.log(idServicio)
        const response = await servicios.postServicio(documento, tituloServicio, direccion, telefono, horaApertura, minutoApertura, horaCierre, minutoCierre, rubro, descripcion, idServicio)
        res.status(201).send(response)
    } catch (error) {
      console.log(error)
        res.status(400).send(error)
    }
}

const getServicios = async (req, res) => {
  try {
        const response = await servicios.getServicios()
        res.status(200).send(response)
  } catch (error) {
        res.status(200).send(response)
  }
}

const getServicioById = async (req, res) => {
  try {
        const idServicio = req.params.idServicio
        const response = await servicios.getServicioById(idServicio)
        res.status(200).send(response)
  } catch (error) {
        res.status(400).send(error)
  }
}

const getPrimerImagen = async (req, res) => {
  try {
    const idServicio = req.params.idServicio
    const response = await servicios.getPrimerImagen(idServicio)
    res.sendFile(response)
  } catch (error) {
        res.send(error)
  }
}

const getImagenes = async (req, res) => {
  try {
    const idServicio = req.params.idServicio
    const numeroImagen = req.params.numeroImagen
    const response = await servicios.getImagenes(idServicio, numeroImagen)
    res.status(200).sendFile(response)
  } catch (error) {
        res.status(400).send("No se ha encontrado una imagen con esas caracterisicas.")
  }
}

const habilitar = async (req, res) => {
  try {
    const idServicio = req.params.idServicio
    const response = await servicios.habilitar(idServicio)
    res.send(response)
  } catch (error) {
    res.send(error)
  }
}


export {postServicio, getServicios, getServicioById, getPrimerImagen, habilitar, getImagenes}