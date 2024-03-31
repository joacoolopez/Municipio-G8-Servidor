//req.body.idServicio = servicio // Generar un identificador único si no se proporciona
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
    const servicio = req.body.idServicio || uuidv4();
    req.body.idServicio = servicio; // Asignar el ID del servicio a la solicitud

    // Crear la carpeta de destino para el servicio si no existe
    const carpetaDestino = path.join(directorioBase, 'imagenes', 'servicios', servicio);
    if (!fs.existsSync(carpetaDestino)) {
      fs.mkdirSync(carpetaDestino, { recursive: true });
    }

    cb(null, carpetaDestino); // Llamar al callback con la carpeta de destino
  },
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname); // Obtener la extensión del archivo

    // Obtener el número de imágenes existentes en la carpeta del servicio
    const carpetaServicio = path.join(directorioBase, 'imagenes', 'servicios', req.body.idServicio);
    const numImagenes = fs.readdirSync(carpetaServicio).length;

    // Generar el nombre del archivo con el formato: servicio-numero.extensión
    const nombreArchivo = `${req.body.idServicio}-${numImagenes + 1}${extension}`;

    cb(null, nombreArchivo); // Llamar al callback con el nombre de archivo generado
  },
});

// Middleware de multer configurado con la opción de almacenamiento definida
const upload = multer({ storage: storage });

export { upload };
