import { PrismaClient } from "@prisma/client"
import { encrypt, isValidPassword } from "../utils/crypt.js";
import { generateToken } from "../utils/jwt.js";
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
        return "USER_NOT_EXIST"
    }
    
    const hashPassword = user.password
    const isValid = await isValidPassword(password, hashPassword)

    if (!isValid){
        return "INCORRECT_PASSWORD"
    }

    const id = user.documento
    const token = generateToken(id)

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

export default {generarClave, login, getHabilitado, getPasswordActiva}