import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
import path from "path";


prisma.$connect()
  .then(() => console.log('Conectado a la base de datos, estoy en reclamos service'))
  .catch((error) => console.error('Error de conexión a la base de datos:', error));

const postReclamo = async (documentoVecino, legajoInspector, idSitio, idDesperfecto, descripcion) => {

    const nuevoReclamo = await prisma.Reclamos.create({
        data: {
            documento: documentoVecino,
            legajo: legajoInspector,
            idSitio: idSitio,
            idDesperfecto: idDesperfecto,
            descripcion: descripcion,
            estado: 'Pendiente' //ver
        },
      });
      return nuevoReclamo
}

const getReclamos = async () => {

  const reclamos = await prisma.Reclamos.findMany({
    select: {
      sitios: {
        select: {
          descripcion: true,
        },
      },
      idReclamo: true
    }
  });
  return reclamos
}

//Para mostar en la pantalla de busqueda reclamos
const getReclamoParcialById = async (idReclamo) => {

  const reclamos = await prisma.Reclamos.findMany({
    select: {
      sitios: {
        select: {
          descripcion: true,
        },
      },
      idReclamo: true
    },
    where: {
      idReclamo: idReclamo
    }
  });
  return reclamos
}


const getReclamoById = async (idReclamo) => {

  const reclamo = await prisma.Reclamos.findMany({
    where: {
      idReclamo: idReclamo
    },
    select: {
      idReclamo: true,
      estado: true,
      sitios: {
        select: {
          descripcion: true,
        },
      },
      descripcion: true,
    }
  });
  return reclamo
}

//Para perfil de vecino
const getReclamosByVecino = async (documentoVecino) => {

  const reclamos = await prisma.Reclamos.findMany({
    select: {
      sitios: {
        select: {
          descripcion: true,
        },
      },
        idReclamo: true,
    },
    where: {
      documento: documentoVecino
    }
  });
  return reclamos
}

//Para perfil de inspector
const getReclamosByInspector = async (legajo) => {

  const reclamos = await prisma.Reclamos.findMany({
    select: {
        sitios:{
          select: {
            descripcion: true,
          }
        },
        idReclamo: true
    },
    where: {
      legajo: legajo
    }
  });
  return reclamos
}


const getReclamosByRubro = async (idRubro) => {

  // Primero, encuentra los IDs de los desperfectos asociados con el rubro
  const desperfectosDelRubro = await prisma.Desperfectos.findMany({
    where: {
      idRubro: idRubro
    },
    select: {
      idDesperfecto: true
    }
  });

  // Extrae los IDs de los desperfectos
  const idsDesperfectos = desperfectosDelRubro.map(desperfecto => desperfecto.idDesperfecto);

  // Ahora, encuentra los reclamos asociados con los IDs de los desperfectos encontrados
  const reclamos = await prisma.Reclamos.findMany({
    where: {
      idDesperfecto: {
        in: idsDesperfectos
      }
    },
    select: {
      idReclamo: true,
      sitios: {
        select: {
          descripcion: true,
        }
      }
    }
  });

  return reclamos
}


export default {postReclamo, getReclamos, getReclamoById, getReclamoParcialById, getReclamosByVecino, getReclamosByInspector, getReclamosByRubro}