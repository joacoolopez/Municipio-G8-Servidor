import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
import path from "path";

const postServicio = async (documentoVecino, tituloServicio, direccion, telefono, horaApertura, minutoApertura, horaCierre, minutoCierre, rubro, descripcion, idServicio) => {

    const nuevoServicio = await prisma.vecinoServicios.create({
        data: {
          idServicio: idServicio,
          documentoVecino: documentoVecino,
          tituloServicio: tituloServicio,
          direccion: direccion,
          telefono: telefono,
          horaApertura: horaApertura,
          minutoApertura: minutoApertura,
          horaCierre: horaCierre,
          minutoCierre: minutoCierre,
          idRubroMercado: parseInt(rubro),
          descripcion: descripcion
        },
      });
      return nuevoServicio
}

const getServicios = async () => {
  const servicios = await prisma.vecinoServicios.findMany({
    where: {
      habilitado: true,
    },
    select: {
      idServicio: true,
      documentoVecino: true,
      tituloServicio: true,
      telefono: true,
      horaApertura: true,
      minutoApertura: true,
      horaCierre: true,
      minutoCierre: true,
      descripcion: true,
      habilitado: true,
      vecinos: {
        select: {
          nombre: true,
          apellido: true,
        },
      },
      rubroMercado: {
        select: {
          descripcion: true,
        },
      },
    },
  });
  return servicios
}

const getServicioById = async (idServicio) => {

  const servicio = await prisma.vecinoServicios.findMany({
    where: {
      habilitado: true,
      idServicio: idServicio,
    },
    select: {
      idServicio: true,
      documentoVecino: true,
      tituloServicio: true,
      telefono: true,
      horaApertura: true,
      minutoApertura: true,
      horaCierre: true,
      minutoCierre: true,
      descripcion: true,
      habilitado: true,
      vecinos: {
        select: {
          nombre: true,
          apellido: true,
        },
      },
      rubroMercado: {
        select: {
          descripcion: true,
        },
      },
    },
  });
  

  return servicio
}

const getPrimerImagen = async (idServicio) => {
  const directorioBase  = path.resolve();
  const nombreImagen = idServicio + "-1.jpg"
    
  const rutaImagen = path.join(directorioBase, 'imagenes', 'servicios', idServicio, nombreImagen );
  console.log(rutaImagen)
  return rutaImagen
}

const getImagenes = async (idServicio, numeroImagen) => {
  const directorioBase  = path.resolve();
  const nombreImagen = idServicio + "-" + numeroImagen + ".jpg"
    
  const rutaImagen = path.join(directorioBase, 'imagenes', 'servicios', idServicio, nombreImagen );
  console.log(rutaImagen)
  return rutaImagen
}

const habilitar = async (idServicio) => {
  const servicioExiste = await prisma.vecinoServicios.findUnique({
    where:{
      idServicio: idServicio
    },
    include: {
        vecinos: true // Incluimos la relación con Vecinos para obtener el documento del vecino
    }
  })

  if (!servicioExiste){
    return "SERVICIO_NOT_EXIST"
  }

  const servicioModificado = await prisma.vecinoServicios.update({
    where:{
      idServicio: idServicio
    },
    data:{
      habilitado: true
    }
  })

  await prisma.notificaciones.create({
    data: {
        documentoVecino: servicioExiste.vecinos.documento,
        legajo: null,
        descripcion: `El servicio ${servicioExiste.tituloServicio} ha sido habilitado.`,
        fecha: new Date(),
    }
});

  return servicioModificado
}

export default {postServicio, getServicios, getServicioById, getPrimerImagen,habilitar, getImagenes}