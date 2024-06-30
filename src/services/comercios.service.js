import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
import path from "path";

const postComercio = async (documentoVecino, nombreComercio, descripcion, direccion, contacto, idComercio) => {

    const nuevoComercio = await prisma.VecinoComercios.create({
        data: {
            
            documentoVecino: documentoVecino,
            nombreComercio: nombreComercio,
            descripcion: descripcion,
            direccion: direccion,
            contacto: contacto,
            idComercio: idComercio
        },
    });
    return nuevoComercio
}
const getComercios = async () => {
    const comercios = await prisma.VecinoComercios.findMany({
        where: {
            habilitado: true,
          },
          select: {
            idComercio: true,
            documentoVecino: true,
            descripcion: true,
            direccion: true,
            nombreComercio: true,
            habilitado: true,
            contacto: true,
            vecinos: {
              select: {
                nombre: true,
                apellido: true,
              },
            },
          },
    });
    return comercios
}
const getComercioById = async (idComercio) => {
    const comercio = await prisma.VecinoComercios.findMany({
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
        },
        include: {
            vecinos: true // Incluimos la relación con Vecinos para obtener el documento del vecino
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
    console.log(existeComercio)
    
    await prisma.notificaciones.create({
        data: {
            documentoVecino: existeComercio.vecinos.documento,
            legajo: null,
            descripcion: `El comercio ${existeComercio.nombreComercio} ha sido habilitado.`,
            fecha: new Date(),
        }
    });

    return comercioModificado
}

const getPrimerImagen = async (idComercio) => {
    const directorioBase  = path.resolve();
    const nombreImagen = idComercio + "-1.jpg"
    console.log(idComercio)
    const rutaImagen = path.join(directorioBase, 'imagenes', 'comercios', idComercio, nombreImagen );
    console.log(rutaImagen)
    return rutaImagen
}

const getImagenes = async (idComercio, numeroImagen) => {
    const directorioBase  = path.resolve();
    const nombreImagen = idComercio + "-" + numeroImagen + ".jpg"
      
    const rutaImagen = path.join(directorioBase, 'imagenes', 'comercios', idComercio, nombreImagen );
    console.log(rutaImagen)
    return rutaImagen
  }

export default {postComercio, getComercios, getComercioById, habilitarComercio, getPrimerImagen, getImagenes}