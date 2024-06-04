import { PrismaClient } from "@prisma/client"
import { encrypt, isValidPassword } from "../utils/crypt.js";
import { generateToken } from "../utils/jwt.js";
import { enviarMailHabilitado, enviarMailNoHabilitado, enviarMailRecuperarClave } from "../utils/resend.js";
import { randomPassword } from "../utils/randomPassword.js";

const prisma = new PrismaClient()

const generarClave = async (documento, password) => {
    const vecinoHabilitado = await prisma.vecinoUser.findUnique({
        where: {
            documentoVecino: documento,
            habilitado: true,
            passwordActiva: false

        },
    });

    if (!vecinoHabilitado) {
        return "INVALID"
    }

    const passwordEncriptada = await encrypt(password)

    const usuarioActualizado = await prisma.vecinoUser.update({
        where: {
            documentoVecino: documento,
        },
        data: {
            password: passwordEncriptada,
            passwordActiva: true
        },
    });

    return usuarioActualizado
}

const login = async (documento, password) => {
    const user = await prisma.vecinoUser.findUnique({
        where: {
            documentoVecino: documento,
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

    const token = generateToken(documento)

    return {token}
}

const getHabilitado = async (documento) => {
    const user = await prisma.vecinoUser.findUnique({
        where: {
            documentoVecino: documento,
        },
    });
    
    const habilitado = user.habilitado
    return {habilitado}
}

const getPasswordActiva = async (documento) => {
    const user = await prisma.vecinoUser.findUnique({
        where: {
            documentoVecino: documento,
        },
    });
    
    const passwordActiva = user.passwordActiva
    return {passwordActiva}
}

const esVecino = async (documento) => {
    const user = await prisma.vecinos.findUnique({
        where: {
            documento: documento,
        },
    });

    if (user){
        return {"esVecino": true}
    } else {
        return {"esVecino": false}
    }
}

const solicitarClave = async (documento, mail) => {
    const user = await prisma.vecinos.findUnique({
        where: {
            documento: documento,
        },
    });

    if (!user){
        return false
    }

    const userNuevo = await prisma.vecinoUser.create({
            data: {
                documentoVecino: documento,
                password: '',
                mail: mail,
                habilitado: false,
                passwordActiva: false
            }
        })
    return userNuevo
}

const cambiarHabilitado = async (documento, estadoHabilitado) => {
    const user = await prisma.vecinoUser.findUnique({
        where: {
            documentoVecino: documento,
        },
    });

    if (!user){
        return false
    }

    if (estadoHabilitado){
        
        const updatedUser = await prisma.vecinoUser.update({
            where: {
                documentoVecino: documento
            },
            data: {
                habilitado: true
            }
        });
        enviarMailHabilitado(documento, user.mail)
        return true
    }else {
        enviarMailNoHabilitado(documento, user.mail)
        return true
    }
}

const recuperarClave = async (documento, mail) => {
    const user = await prisma.vecinoUser.findUnique({
        where: {
            documentoVecino: documento,
            mail: mail,
            habilitado: true,
            passwordActiva: true
        },
    });

    if (!user){
        return false
    }

    const newPassword = randomPassword()
    console.log(newPassword)

    const passwordEncriptada = await encrypt(newPassword)

    const updatedUser = await prisma.vecinoUser.update({
        where: {
            documentoVecino: documento,
            mail: mail,
        },
        data: {
            password: passwordEncriptada
        }
    });
    

    enviarMailRecuperarClave(documento, mail, newPassword)
    return true

}

const cambiarClave = async (documento,contraseniaActual, contraseniaNueva) => {
    const user = await prisma.vecinoUser.findUnique({
        where: {
            documentoVecino: documento,
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

    const updatedUser = await prisma.vecinoUser.update({
        where: {
            documentoVecino: documento
        },
        data: {
            password: contraseniaNuevaEncriptada
        }
    });

    return true
}

export default {generarClave, login, getHabilitado, getPasswordActiva, esVecino, solicitarClave, cambiarHabilitado, recuperarClave, cambiarClave}