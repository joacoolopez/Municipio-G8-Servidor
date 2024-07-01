import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()


const getNotificacionesVecino = async (documento) => {
    const notificaciones = await prisma.notificaciones.findMany({
        where: {
            documentoVecino: documento
        },
        select: {
            id: true,
            descripcion: true,
            fecha:true
        },
        orderBy: {
            fecha: 'desc'
        }
    });

    return {notificaciones}
}

const getNotificacionesInspector = async (legajo) => {
    const notificaciones = await prisma.notificaciones.findMany({
        where: {
            legajo: legajo
        },
        select: {
            id: true,
            descripcion: true,
            fecha:true
        },
        orderBy: {
            fecha: 'desc'
        }
    });

    return {notificaciones}
}


export default {getNotificacionesVecino, getNotificacionesInspector}