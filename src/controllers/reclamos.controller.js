import reclamos from '../services/reclamos.service.js';

const postReclamo = async (req, res) => {
    try {
        const {documentoVecino, legajoInspector, idSitio, idDesperfecto, descripcion} = req.body
        const response = await reclamos.postReclamo(documentoVecino, legajoInspector, idSitio, idDesperfecto, descripcion)
        res.send(response)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

const getReclamos = async (req, res) => {
    try {
        const response = await reclamos.getReclamos()
        res.send(response)
    } catch (error) {
        res.send(error)
    }
}


const getReclamoParcialById = async (req, res) => {
    try {
        const idReclamo = parseInt(req.params.idReclamo)
        const response = await reclamos.getReclamoParcialById(idReclamo)
        res.send (response)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}


const getReclamoById = async (req, res) => {
    try {
        const idReclamo = parseInt(req.params.idReclamo)
        const response = await reclamos.getReclamoById(idReclamo)
        res.send (response)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}


const getReclamosByVecino = async (req, res) => {
    try {
        const documento = req.params.documento
        const response = await reclamos.getReclamosByVecino(documento)
        res.send(response)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}


const getReclamosByInspector = async (req, res) => {
    try {
        const legajo = parseInt(req.params.legajo)
        const response = await reclamos.getReclamosByInspector(legajo)
        res.send(response)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}


//Tengo que ingresar un rubro y obtener los desperfectos de ese rubro y asi obtener los reclamos de esos desperfectos
const getReclamosByRubro = async (req, res) => {
    try {
        const idRubro = parseInt(req.params.idRubro)
        //hacer servicio contolador y ruter de desperfectos para tener un desperfectos by rubro
        const response = await reclamos.getReclamosByRubro(idRubro)
        res.send(response)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

export {postReclamo, getReclamos, getReclamoById, getReclamoParcialById, getReclamosByVecino, getReclamosByInspector, getReclamosByRubro}
