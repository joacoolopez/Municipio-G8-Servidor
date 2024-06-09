import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

const postComercio = async (documentoVecino, nombreComercio, descripcion, direccion, contacto, idComercio) => {

    const nuevoComercio = await prisma.vecinoComercios.create({
        data: {
            idComercio: idComercio,
            documentoVecino: documentoVecino,
            nombreComercio: nombreComercio,
            descripcion: descripcion,
            direccion: direccion,
            contacto: contacto
        },
    });
    return nuevoComercio
}
const getComercios = async () => {
    const comercios = await prisma.vecinoComercios.findMany({
        select: {
            idComercio: true,
            nombreComercio: true,
        },
        where: {
            habilitado: true //verif este habilitado
        }
    });
    return comercios
}
const getComercioById = async (idComercio) => {
    const comercio = await prisma.vecinoComercios.findMany({
    where: {
        habilitado: true,
        idComercio: idComercio,
    },
    select: {
        idComercio: true,
        documentoVecino: true,
        nombreComercio: true,
        descripcion: true,
        direccion: true,
        contacto: true,
        vecinos: {
            select: {
                nombre: true,
                apellido: true,
            },
        },
    },
});

return comercio
}



//habilitar el comercio
const habilitarComercio = async (idComercio) => {
    const existeComercio = await prisma.vecinoComercios.findUnique({
        where: {
            idComercio: idComercio
        }
    })
    if (!existeComercio){
        "COMERCIO_NOT_EXIST"
    }
    const comercioModificado = await prisma.vecinoComercios.update({
        where: {
            idComercio: idComercio
        },
        data: {
            habilitado: true
        }
    })
    return comercioModificado
}

export default {postComercio, getComercios, getComercioById, habilitarComercio}