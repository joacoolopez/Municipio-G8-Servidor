import notificaciones from '../services/notificaciones.service.js';

const getNotificacionesVecino = async (req, res) => {
    try {
        console.log("a")
        const {documento} = req.params.documento
        const response = await notificaciones.getNotificacionesVecino(documento)
        res.status(200).send(response)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

export {getNotificacionesVecino}