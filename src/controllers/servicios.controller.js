import servicios from "../services/servicios.service.js";

const postServicio = async (req, res) => {
    try {
        const {documento, tituloServicio, direccion, telefono, horaApertura, minutoApertura, horaCierre, minutoCierre, rubro, descripcion, idServicio} = req.body
        console.log(req.files)
        const response = await servicios.postServicio(documento, tituloServicio, direccion, telefono, horaApertura, minutoApertura, horaCierre, minutoCierre, rubro, descripcion, idServicio)
        res.status(201).send(response)
    } catch (error) {
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

const habilitar = async (req, res) => {
  try {
    const idServicio = req.params.idServicio
    const response = await servicios.habilitar(idServicio)
    res.send(response)
  } catch (error) {
    res.send(error)
  }
}


export {postServicio, getServicios, getServicioById, getPrimerImagen, habilitar}