import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import multer from 'multer';
import fs from 'fs';

// Definir la carpeta base para guardar las imágenes
const directorioBase = path.resolve();

// Configuración de multer para la subida de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Obtener el nombre del servicio de la solicitud o generar un UUID si no se proporciona

    if (req.body.idReclamoImagen === undefined) {
      const idReclamoImagen = uuidv4()
      req.body.idReclamoImagen = idReclamoImagen;
    }
    
     // Asignar el ID del servicio a la solicitud

    // Crear la carpeta de destino para el servicio si no existe
    const carpetaDestino = path.join(directorioBase, 'imagenes', 'reclamos', req.body.idReclamoImagen);
    if (!fs.existsSync(carpetaDestino)) {
      fs.mkdirSync(carpetaDestino, { recursive: true });
    }

    cb(null, carpetaDestino); // Llamar al callback con la carpeta de destino
  },
  filename: function (req, file, cb) {
    const extension = '.jpg' // Obtener la extensión del archivo

    // Obtener el número de imágenes existentes en la carpeta del servicio
    const carpetaReclamo = path.join(directorioBase, 'imagenes', 'reclamos', req.body.idReclamoImagen);
    const numImagenes = fs.readdirSync(carpetaReclamo).length;

    // Generar el nombre del archivo con el formato: servicio-numero.extensión
    const nombreArchivo = `${req.body.idReclamoImagen}-${numImagenes + 1}${extension}`;

    cb(null, nombreArchivo); // Llamar al callback con el nombre de archivo generado
  },
});

// Middleware de multer configurado con la opción de almacenamiento definida
const upload = multer({ storage: storage });

export { upload };
