import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
import path from "path";

const postDenuncia = async (documento, idSitio, descripcion, aceptaResponsabilidad, idDenunciaPruebas) => {

    const nuevaDenuncia = await prisma.Denuncias.create({
        data: {
            documento: documento,
            idSitio: idSitio,
            descripcion: descripcion,
            aceptaResponsabilidad: aceptaResponsabilidad,
            estado: 'Pendiente',
            idDenunciaPruebas: idDenunciaPruebas
        },
      });
      return nuevaDenuncia
}


const getDenuncias = async () => {

  const denuncias = await prisma.Denuncias.findMany({
    select: {
        idDenuncias: true,
        sitios: {
            select: {
                descripcion: true,
            }
        },
        idDenuncias: true,
    }
  });
  return denuncias
}


const getDenunciaParcialById = async (idDenuncia) => {

  const denuncia = await prisma.Denuncias.findMany({
    select: {
      sitios: {
        select: {
          descripcion: true,
        },
      },
      idDenuncias: true
    },
    where: {
      idDenuncias: idDenuncia
    }
  });
  return denuncia
}


const getDenunciaById = async (idDenuncia) => {

  const denuncia = await prisma.Denuncias.findMany({
    where: {
      idDenuncias: idDenuncia
    },
    select: {
      idDenuncias: true,
      estado: true,
      sitios: {
        select: {
          descripcion: true,
        },
      },
      descripcion: true,
    }
  });
  return denuncia
}

//Para perfil de vecino
const getDenunciasByVecino = async (documento) => {

  const denuncias = await prisma.Denuncias.findMany({
    select: {
      sitios: {
        select: {
          descripcion: true,
        },
      },
        idDenuncias: true,
    },
    where: {
      documento: documento
    }
  });
  return denuncias
}


const getEstadoDenuncia = async (idDenuncia) => {
    
    const estado = await prisma.Denuncias.findUnique({
      where: {
        idDenuncias: idDenuncia
      },
      select: {
        estado: true
      }
    });
    return estado
  }


//Para uso del municipio
const cambiarEstadoDenuncia = async (idDenuncia, nuevoEstado) => {
  
    const denuncia = await prisma.Denuncias.update({
      where: {
        idDenuncias: idDenuncia
      },
      data: {
        estado: nuevoEstado
      }
    });
    return denuncia
  }


//Manejo de imagenes
const getPrimerImagen = async (idDenuncia) => {
  const denuncia = await prisma.Denuncias.findUnique({
    where: {
      idDenuncias: idDenuncia
    },
    select: {
      idDenunciaPruebas: true
    }
  });

  const idDenunciaPruebas = denuncia.idDenunciaPruebas

  const directorioBase  = path.resolve();
  const nombreImagen = idDenunciaPruebas + "-1.jpg"
    
  const rutaImagen = path.join(directorioBase, 'imagenes', 'denuncias', idDenunciaPruebas, nombreImagen );
  console.log(rutaImagen)
  return rutaImagen
}

const getImagenes = async (idDenuncia, numeroImagen) => {
  const denuncia = await prisma.Denuncias.findUnique({
    where: {
      idDenuncias: idDenuncia
    },
    select: {
      idDenunciaPruebas: true
    }
  });
  const idDenunciaPruebas = denuncia.idDenunciaPruebas

  const directorioBase  = path.resolve();
  const nombreImagen = idDenunciaPruebas + "-" + numeroImagen + ".jpg"
  console.log(nombreImagen)
  const rutaImagen = path.join(directorioBase, 'imagenes', 'denuncias', idDenunciaPruebas, nombreImagen );
  console.log(rutaImagen)
  return rutaImagen
}


//Manejo de archivos
const getZipArchivos = async (idDenuncia) => {
  const denuncia = await prisma.Denuncias.findUnique({
    where: {
      idDenuncias: idDenuncia
    },
    select: {
      idDenunciaPruebas: true
    }
  });
  const idDenunciaPruebas = denuncia.idDenunciaPruebas

  const directorioBase  = path.resolve();
  const nombreZip = idDenunciaPruebas + ".zip"
  console.log(nombreZip)
  const rutaZip = path.join(directorioBase, 'imagenes', 'denuncias', idDenunciaPruebas, nombreZip);
  console.log(rutaZip)
  return rutaZip
}

export default {postDenuncia, getDenuncias, getDenunciaParcialById, getDenunciaById, getDenunciasByVecino, getEstadoDenuncia, cambiarEstadoDenuncia, getPrimerImagen, getImagenes, getZipArchivos}