-- CreateTable
CREATE TABLE "DenunciaDenunciado" (
    "idDenunciaDenunciado" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "ubicacionHecho" TEXT,

    CONSTRAINT "DenunciaDenunciado_pkey" PRIMARY KEY ("idDenunciaDenunciado")
);

-- AddForeignKey
ALTER TABLE "DenunciaDenunciado" ADD CONSTRAINT "DenunciaDenunciado_idDenunciaDenunciado_fkey" FOREIGN KEY ("idDenunciaDenunciado") REFERENCES "Denuncias"("idDenuncias") ON DELETE RESTRICT ON UPDATE CASCADE;
