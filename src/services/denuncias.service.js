import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
import path from "path";

const postDenuncia = async (documento, idSitio, descripcion, aceptaResponsabilidad, idDenunciaPruebas, nombre, direccion, ubicacionHecho) => {
  try {
    // Crear la denuncia primero
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

    const idDenuncias = nuevaDenuncia.idDenuncias
    console.log(nuevaDenuncia.idDenuncias)
    // Utilizar el id de la denuncia creada para crear el registro en DenunciaDenunciados
    const nuevaDenunciaDenunciado = await prisma.DenunciaDenunciado.create({
        data: {
            idDenunciaDenunciado: idDenuncias, // Utiliza nuevaDenuncia.id si es el id generado automáticamente
            nombre: nombre,
            direccion: direccion,
            ubicacionHecho: ubicacionHecho
        },
    });

    return { nuevaDenuncia, nuevaDenunciaDenunciado };
    
} catch (error) {
    console.error("Error al crear la denuncia y el denunciado:", error);
    throw error;
}
};


const getDenuncias = async () => {

  const denuncias = await prisma.Denuncias.findMany({
    select: {
        idDenuncias: true,
        descripcion: true,
        estado: true,
        denunciaDenunciado: {
            select: {
                nombre: true,
                direccion: true,
                ubicacionHecho: true
            }
        },
        movimientosDenuncia: {
          select: {
            responsable: true,
            causa: true,
            fecha: true
          }
        }
  }});

  return denuncias
}


const getDenunciaParcialById = async (idDenuncia) => {

  const denuncia = await prisma.Denuncias.findMany({
    select: {
      idDenuncias: true,
      denunciaDenunciado: {
          select: {
              nombre: true,
              direccion: true
          }
      },
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
      descripcion: true,
      estado: true,
      denunciaDenunciado: {
          select: {
              nombre: true,
              direccion: true,
              ubicacionHecho: true
          }
      },
      movimientosDenuncia: {
        select: {
          responsable: true,
          causa: true,
          fecha: true
        }
    }}
  });
  return denuncia
}

//Para perfil de vecino
const getDenunciasByVecino = async (documento) => {

  const denuncias = await prisma.Denuncias.findMany({
    select: {
      idDenuncias: true,
      descripcion: true,
      estado: true,
      denunciaDenunciado: {
          select: {
              nombre: true,
              direccion: true,
              ubicacionHecho: true
          }
      },
      movimientosDenuncia: {
        select: {
          responsable: true,
          causa: true,
          fecha: true
        }
    }},
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

  const postMovimientoDenuncia = async (idDenuncia, responsable, causa) => {
    
    const movimientoDenuncia = await prisma.MovimientosDenuncia.create({
      data: {
        idDenuncia: idDenuncia,
        responsable: responsable,
        causa: causa
      }
    });
    return movimientoDenuncia
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

export default {postDenuncia, getDenuncias, getDenunciaParcialById, getDenunciaById, getDenunciasByVecino, getEstadoDenuncia, cambiarEstadoDenuncia, postMovimientoDenuncia, getPrimerImagen, getImagenes, getZipArchivos}