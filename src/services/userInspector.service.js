import { PrismaClient } from "@prisma/client"
import { encrypt, isValidPassword } from "../utils/crypt.js";
import { generateTokenInspector } from "../utils/jwt.js";
import { enviarMailRecuperarClaveInspector } from "../utils/mails.js";
import { randomPassword } from "../utils/randomPassword.js";

const prisma = new PrismaClient()


const login = async (legajo, password) => {
    const user = await prisma.personal.findUnique({
        where: {
            legajo: legajo,
        },
    });
    if (!user){
        return false
    }
    
    const hashPassword = user.password
    const isValid = await isValidPassword(password, hashPassword)

    if (!isValid){
        return false
    }

    const token = generateTokenInspector(legajo)

    return {user, token}
}

const recuperarClave = async (legajo, mail) => {
    const user = await prisma.personalMail.findUnique({
        where: {
            legajo: legajo,
            mail: mail
        },
    });
    console.log(user)
    if (!user){
        return false
    }

    const newPassword = randomPassword()
    console.log(newPassword)

    const passwordEncriptada = await encrypt(newPassword)

    const updatedUser = await prisma.personal.update({
        where: {
            legajo: legajo
        },
        data: {
            password: passwordEncriptada
        }
    });
    

    enviarMailRecuperarClaveInspector(legajo, mail, newPassword)
    return true

}

const cambiarClave = async (legajo,contraseniaActual, contraseniaNueva) => {
    const user = await prisma.personal.findUnique({
        where: {
            legajo: legajo,
        },
    });
    if (!user){
        return false
    }
    
    const hashPassword = user.password
    const isValid = await isValidPassword(contraseniaActual, hashPassword)

    if (!isValid){
        return false
    }

    const contraseniaNuevaEncriptada = await encrypt(contraseniaNueva)

    const updatedUser = await prisma.personal.update({
        where: {
            legajo: legajo
        },
        data: {
            password: contraseniaNuevaEncriptada
        }
    });

    return true
}

export default {login, recuperarClave, cambiarClave}