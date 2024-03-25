-- CreateTable
CREATE TABLE "Vecinos" (
    "documento" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "direccion" TEXT,
    "codigoBarrio" INTEGER,

    CONSTRAINT "Vecinos_pkey" PRIMARY KEY ("documento")
);

-- CreateTable
CREATE TABLE "Personal" (
    "legajo" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "documento" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "sector" TEXT NOT NULL,
    "categoria" INTEGER,
    "fechaIngreso" TIMESTAMP(3),

    CONSTRAINT "Personal_pkey" PRIMARY KEY ("legajo")
);

-- CreateTable
CREATE TABLE "Sitios" (
    "idSitio" SERIAL NOT NULL,
    "latitud" DOUBLE PRECISION,
    "longitud" DOUBLE PRECISION,
    "calle" TEXT,
    "numero" INTEGER,
    "entreCalleA" TEXT,
    "entreCalleB" TEXT,
    "descripcion" TEXT NOT NULL,
    "aCargoDe" TEXT NOT NULL,
    "apertura" TEXT,
    "cierre" TEXT,
    "comentarios" TEXT,

    CONSTRAINT "Sitios_pkey" PRIMARY KEY ("idSitio")
);

-- CreateTable
CREATE TABLE "Rubros" (
    "idRubro" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "Rubros_pkey" PRIMARY KEY ("idRubro")
);

-- CreateTable
CREATE TABLE "Desperfectos" (
    "idDesperfecto" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL,
    "idRubro" INTEGER NOT NULL,

    CONSTRAINT "Desperfectos_pkey" PRIMARY KEY ("idDesperfecto")
);

-- CreateTable
CREATE TABLE "Reclamos" (
    "idReclamo" SERIAL NOT NULL,
    "documento" TEXT,
    "legajo" INTEGER,
    "idSitio" INTEGER NOT NULL,
    "idDesperfecto" INTEGER,
    "descripcion" TEXT,
    "estado" TEXT NOT NULL,
    "IdReclamoUnificado" INTEGER,

    CONSTRAINT "Reclamos_pkey" PRIMARY KEY ("idReclamo")
);

-- CreateTable
CREATE TABLE "MovimientosReclamo" (
    "idMovimiento" SERIAL NOT NULL,
    "idReclamo" INTEGER NOT NULL,
    "responsable" TEXT NOT NULL,
    "causa" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MovimientosReclamo_pkey" PRIMARY KEY ("idMovimiento")
);

-- CreateTable
CREATE TABLE "Denuncias" (
    "idDenuncias" SERIAL NOT NULL,
    "documento" TEXT NOT NULL,
    "idSitio" INTEGER,
    "descripcion" TEXT,
    "estado" TEXT,
    "aceptaResponsabilidad" INTEGER NOT NULL,

    CONSTRAINT "Denuncias_pkey" PRIMARY KEY ("idDenuncias")
);

-- CreateTable
CREATE TABLE "MovimientosDenuncia" (
    "idMovimiento" SERIAL NOT NULL,
    "idDenuncia" INTEGER NOT NULL,
    "responsable" TEXT NOT NULL,
    "causa" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MovimientosDenuncia_pkey" PRIMARY KEY ("idMovimiento")
);

-- CreateTable
CREATE TABLE "Barrios" (
    "idBarrio" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Barrios_pkey" PRIMARY KEY ("idBarrio")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vecinos_documento_key" ON "Vecinos"("documento");

-- AddForeignKey
ALTER TABLE "Vecinos" ADD CONSTRAINT "Vecinos_codigoBarrio_fkey" FOREIGN KEY ("codigoBarrio") REFERENCES "Barrios"("idBarrio") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Desperfectos" ADD CONSTRAINT "Desperfectos_idRubro_fkey" FOREIGN KEY ("idRubro") REFERENCES "Rubros"("idRubro") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reclamos" ADD CONSTRAINT "Reclamos_documento_fkey" FOREIGN KEY ("documento") REFERENCES "Vecinos"("documento") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reclamos" ADD CONSTRAINT "Reclamos_legajo_fkey" FOREIGN KEY ("legajo") REFERENCES "Personal"("legajo") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reclamos" ADD CONSTRAINT "Reclamos_idSitio_fkey" FOREIGN KEY ("idSitio") REFERENCES "Sitios"("idSitio") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reclamos" ADD CONSTRAINT "Reclamos_idDesperfecto_fkey" FOREIGN KEY ("idDesperfecto") REFERENCES "Desperfectos"("idDesperfecto") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovimientosReclamo" ADD CONSTRAINT "MovimientosReclamo_idReclamo_fkey" FOREIGN KEY ("idReclamo") REFERENCES "Reclamos"("idReclamo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Denuncias" ADD CONSTRAINT "Denuncias_documento_fkey" FOREIGN KEY ("documento") REFERENCES "Vecinos"("documento") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Denuncias" ADD CONSTRAINT "Denuncias_idSitio_fkey" FOREIGN KEY ("idSitio") REFERENCES "Sitios"("idSitio") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovimientosDenuncia" ADD CONSTRAINT "MovimientosDenuncia_idDenuncia_fkey" FOREIGN KEY ("idDenuncia") REFERENCES "Denuncias"("idDenuncias") ON DELETE RESTRICT ON UPDATE CASCADE;
