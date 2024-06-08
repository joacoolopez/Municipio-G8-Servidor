import reclamos from '../services/reclamos.service.js';

const postReclamo = async (req, res) => {
    try {
        const {documentoVecino, legajoInspector, idSitio, idDesperfecto, descripcion} = req.body
        const response = await reclamos.postReclamo(documentoVecino, legajoInspector, idSitio, idDesperfecto, descripcion)
        res.status(201).send(response)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
}

const getReclamos = async (req, res) => {
    try {
        const response = await reclamos.getReclamos()
        res.status(200).send(response)
    } catch (error) {
        res.status(400).send(error)
    }
}


const getReclamoParcialById = async (req, res) => {
    try {
        const idReclamo = parseInt(req.params.idReclamo)
        const response = await reclamos.getReclamoParcialById(idReclamo)
        res.status(200).send(response)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
}


const getReclamoById = async (req, res) => {
    try {
        const idReclamo = parseInt(req.params.idReclamo)
        const response = await reclamos.getReclamoById(idReclamo)
        res.status(200).send(response)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
}


const getReclamosByVecino = async (req, res) => {
    try {
        const documento = req.params.documento
        const response = await reclamos.getReclamosByVecino(documento)
        res.status(200).send(response)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
}


const getReclamosByInspector = async (req, res) => {
    try {
        const legajo = parseInt(req.params.legajo)
        const response = await reclamos.getReclamosByInspector(legajo)
        res.status(200).send(response)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
}


//Tengo que ingresar un rubro y obtener los desperfectos de ese rubro y asi obtener los reclamos de esos desperfectos
const getReclamosByRubro = async (req, res) => {
    try {
        const idRubro = parseInt(req.params.idRubro)
        //hacer servicio contolador y ruter de desperfectos para tener un desperfectos by rubro
        const response = await reclamos.getReclamosByRubro(idRubro)
        res.status(200).send(response)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
}


//Endpoints dedicados al uso del municipio

//Cambiar estado de un reclamo
const cambiarEstadoReclamo = async (req, res) => {
    try {
        const idReclamo = parseInt(req.params.idReclamo)
        const { nuevoEstado } = req.body
        
        const estados = ["Abierto", "En proceso", "Cerrado"]
        if (!estados.includes(nuevoEstado)) {
            res.status(400).send("Los estados deben ser: Abierto, En proceso o Cerrado.")
        }
        else{
            const response = await reclamos.cambiarEstadoReclamo(idReclamo, nuevoEstado)
            res.status(200).send(response)
        }
    } catch (error) {
        console.log(error)
        res.status(304).send(error)
    }
}


//El municipio deriva el reclamo a otro y se registra en movimientosReclamo
const postMovimientoReclamo = async (req, res) => {
    try {
        const idReclamo = parseInt(req.params.idReclamo)

        const estadoReclamo = await reclamos.getEstadoReclamo(idReclamo)
        if (estadoReclamo.estado == "Cerrado") {
            res.status(400).send("No se puede derivar un reclamo cerrado")
        }
        else{
            const { responsable, causa } = req.body
            const response = await reclamos.postMovimientoReclamo(idReclamo, responsable, causa)
            res.status(201).send(response)
        }
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
}


const getMovimientosReclamo = async (req, res) => {
    try {
        const idReclamo = parseInt(req.params.idReclamo)
        const response = await reclamos.getMovimientosReclamo(idReclamo)
        res.status(200).send(response)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
}


//Unificacion de reclamos
const unificarReclamos = async (req, res) => {
    try {
        //listado de reclamos qeu seran unificados en uno
        const { listaIdsReclamos, idReclamoUnificador } = req.body
        for (let idReclamo of listaIdsReclamos) {
            await reclamos.patchIdReclamoUnificado(idReclamo, idReclamoUnificador)
        }
        res.status(200).send("Reclamos unificados exitosamente")
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
}




export {postReclamo, getReclamos, getReclamoById, getReclamoParcialById, getReclamosByVecino, getReclamosByInspector, getReclamosByRubro, cambiarEstadoReclamo, getMovimientosReclamo, postMovimientoReclamo, unificarReclamos}
