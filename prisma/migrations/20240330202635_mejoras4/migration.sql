-- CreateTable
CREATE TABLE "VecinoServicios" (
    "idServicio" SERIAL NOT NULL,
    "documentoVecino" TEXT NOT NULL,
    "contacto" TEXT NOT NULL,
    "horaApertura" TEXT NOT NULL,
    "horaCierre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "VecinoServicios_pkey" PRIMARY KEY ("idServicio")
);

-- CreateTable
CREATE TABLE "VecinoComercios" (
    "idComercio" SERIAL NOT NULL,
    "documentoVecino" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "contacto" TEXT NOT NULL,

    CONSTRAINT "VecinoComercios_pkey" PRIMARY KEY ("idComercio")
);

-- AddForeignKey
ALTER TABLE "VecinoServicios" ADD CONSTRAINT "VecinoServicios_documentoVecino_fkey" FOREIGN KEY ("documentoVecino") REFERENCES "Vecinos"("documento") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VecinoComercios" ADD CONSTRAINT "VecinoComercios_documentoVecino_fkey" FOREIGN KEY ("documentoVecino") REFERENCES "Vecinos"("documento") ON DELETE RESTRICT ON UPDATE CASCADE;
