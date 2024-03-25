import userVecino from "../services/userVecino.service.js";


const generarClave = async (req, res) => {
    try {
        const {documento, password} = req.body
        const response = await userVecino.generarClave(documento, password)
        res.send(response)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

const login = async (req, res) => {
    try {
        const {documento, password} = req.body
        const response = await userVecino.login(documento, password)
        res.send(response)
    } catch (error) {
        res.send(error)   
    }
}

const getHabilitado = async (req, res) => {
    try {
        const documento = req.params.documento
        const response = await userVecino.getHabilitado(documento)
        res.send(response)
    } catch (error) {
        res.send(error)
    }
}

const getPasswordActiva = async (req, res) => {
    try {
        const documento = req.params.documento
        const response = await userVecino.getPasswordActiva(documento)
        res.send(response)
    } catch (error) {
        res.send(error)
    }
}

export {generarClave, login, getHabilitado, getPasswordActiva}