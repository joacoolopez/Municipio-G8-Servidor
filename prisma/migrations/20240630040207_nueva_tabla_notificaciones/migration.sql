-- CreateTable
CREATE TABLE "Notificaciones" (
    "id" SERIAL NOT NULL,
    "documentoVecino" TEXT NOT NULL,
    "legajo" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "Notificaciones_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Notificaciones" ADD CONSTRAINT "Notificaciones_documentoVecino_fkey" FOREIGN KEY ("documentoVecino") REFERENCES "VecinoUser"("documentoVecino") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notificaciones" ADD CONSTRAINT "Notificaciones_legajo_fkey" FOREIGN KEY ("legajo") REFERENCES "Personal"("legajo") ON DELETE RESTRICT ON UPDATE CASCADE;
