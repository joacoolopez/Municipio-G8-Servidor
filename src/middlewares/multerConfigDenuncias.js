import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import multer from 'multer';
import fs from 'fs';
import archiver from 'archiver';


// Definir la carpeta base para guardar las imágenes
const directorioBase = path.resolve();

// Configuración de multer para la subida de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Obtener el nombre del servicio de la solicitud o generar un UUID si no se proporciona

    if (req.body.idDenunciaPruebas === undefined) {
      const idDenunciaPruebas = uuidv4()
      req.body.idDenunciaPruebas = idDenunciaPruebas;
    }
    
     // Asignar el ID del servicio a la solicitud

    // Crear la carpeta de destino para el servicio si no existe
    const carpetaDestino = path.join(directorioBase, 'imagenes', 'denuncias', req.body.idDenunciaPruebas);
    if (!fs.existsSync(carpetaDestino)) {
      fs.mkdirSync(carpetaDestino, { recursive: true });
    }

    cb(null, carpetaDestino); // Llamar al callback con la carpeta de destino
  },
  filename: function (req, file, cb) {
    const isImage = file.mimetype.startsWith('image/');
    const extension = isImage ? '.jpg' : path.extname(file.originalname); //si es imagen uso .jpg, si no uso la extensión original

    // Obtener el número de imágenes existentes en la carpeta del servicio
    const carpetaDenuncia = path.join(directorioBase, 'imagenes', 'denuncias', req.body.idDenunciaPruebas);
    const numImagenes = fs.readdirSync(carpetaDenuncia).length;

    // Generar el nombre del archivo con el formato: servicio-numero.extensión
    const nombreArchivo = `${req.body.idDenunciaPruebas}-${numImagenes + 1}${extension}`;

    cb(null, nombreArchivo); // Llamar al callback con el nombre de archivo generado
  },
});

// Middleware de multer configurado con la opción de almacenamiento definida
const upload = multer({ storage: storage });


// Función para crear un archivo ZIP de todos los archivos que no son imágenes subidos
const crearZip = (idDenunciaPruebas) => {
  const carpetaDenuncia = path.join(directorioBase, 'imagenes', 'denuncias', idDenunciaPruebas);
  const zipPath = path.join(carpetaDenuncia, `${idDenunciaPruebas}.zip`);
  const output = fs.createWriteStream(zipPath);
  const archive = archiver('zip', {
    zlib: { level: 9 }, // Nivel de compresión
  });

  archive.on('error', (err) => {
    throw err;
  });

  archive.pipe(output);

  // Agregar solo archivos que no son imágenes al ZIP
  fs.readdirSync(carpetaDenuncia).forEach(file => {
    const filePath = path.join(carpetaDenuncia, file);
    archive.file(filePath, { name: file });
  });

  archive.finalize();
};

export { upload, crearZip };
