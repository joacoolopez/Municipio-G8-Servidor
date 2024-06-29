import userInspector from "../services/userInspector.service.js";


const login = async (req, res) => {
    try {
        const {legajo, password} = req.body
        const response = await userInspector.login(legajo, password)

        if (response){
            res.status(200).send(response)
        }else{
            res.status(401).send(response)
        }
        
    } catch (error) {
        res.status(500).send(error)
        console.log(error)
    }
}

const recuperarClave = async (req, res) => {
    try {
        const {legajo, mail} = req.body
        console.log(legajo)
        const response = await userInspector.recuperarClave(legajo, mail)
        if (response) {
            res.status(302).send("La contraseña ha sido enviada con exito")
        }else {
            res.status(404).send("No se encontro un usuario con esas credenciales")
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

const cambiarClave = async (req, res) => {
  try {
    const {legajo,contraseniaActual, contraseniaNueva} = req.body
    const response = await userInspector.cambiarClave(legajo,contraseniaActual, contraseniaNueva)
    if (response){
        res.status(200).send("La contraseña ha sido enviada con exito")
    }else {
        res.status(401).send("No se encontro un usuario con esas credenciales")
    }
  } catch (error) {
        res.status(500).send(error)
  }
}



export {login, recuperarClave, cambiarClave}