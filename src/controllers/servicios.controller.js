import servicios from "../services/servicios.service.js";

const postServicio = async (req, res) => {
    try {
        const {documento, tituloServicio, contacto, horaApertura, horaCierre, descripcion, idServicio} = req.body
        console.log(req.files)
        const response = await servicios.postServicio(documento, tituloServicio, contacto, horaApertura, horaCierre, descripcion, idServicio)
        res.send(response)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

const getServicios = async (req, res) => {
  try {
        const response = await servicios.getServicios()
        res.send(response)
  } catch (error) {
        res.send(error)
  }
}

const getServicioById = async (req, res) => {
  try {
        const idServicio = req.params.idServicio
        const response = await servicios.getServicioById(idServicio)
        res.send (response)
  } catch (error) {
        res.send(error)
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