import notificaciones from '../services/notificaciones.service.js';

const getNotificacionesVecino = async (req, res) => {
    try {
        const documento = req.params.documento
        const response = await notificaciones.getNotificacionesVecino(documento)
        res.status(200).send(response)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

const getNotificacionesInspector = async (req, res) => {
    try {
        const legajo = req.params.legajo
        console.log(legajo)
        const response = await notificaciones.getNotificacionesInspector(parseInt(legajo))
        console.log(response)
        res.status(200).send(response)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

export {getNotificacionesVecino, getNotificacionesInspector}