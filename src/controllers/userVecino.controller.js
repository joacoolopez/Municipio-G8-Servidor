import userVecino from "../services/userVecino.service.js";


const generarClave = async (req, res) => {
    try {
        const {documento, password} = req.body
        const response = await userVecino.generarClave(documento, password)
        res.status(201).send(response)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
}

const login = async (req, res) => {
    try {
        const {documento, password} = req.body
        const response = await userVecino.login(documento, password)

        if (response){
            res.status(200).send(response)
        }else{
            res.status(401).send(response)
        }
        
    } catch (error) {
        res.status(500).send(response)
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

const esVecino = async (req, res) => {
    try {
        const documento = req.params.documento
        const response = await userVecino.esVecino(documento)
        if (response) {
            res.status(302).send(response)
        }else {
            res.status(404).send(response)
        }
    } catch (error) {
        res.status(500).send(error)
    }
  
}

const solicitarClave = async (req, res) => {
    try {
        const {documento, mail} = req.body
        const response = await userVecino.solicitarClave(documento, mail)
        res.status(200).send(response)
        
    } catch (error) {
        res.status(500).send(error)
        console.log(error)
    }  
}

const cambiarHabilitado = async (req, res) => {
    try {
        const {documento, estadoHabilitado} = req.body
        const response = await userVecino.cambiarHabilitado(documento, estadoHabilitado)
        res.status(200).send(response)
        
    } catch (error) {
        res.status(500).send(error)
        console.log(error)
    }  
}



export {generarClave, login, getHabilitado, getPasswordActiva, esVecino, solicitarClave, cambiarHabilitado}