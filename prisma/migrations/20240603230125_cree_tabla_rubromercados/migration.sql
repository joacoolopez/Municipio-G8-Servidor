/*
  Warnings:

  - You are about to drop the column `idRubro` on the `VecinoServicios` table. All the data in the column will be lost.
  - Added the required column `idRubroMercado` to the `VecinoServicios` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "VecinoServicios" DROP CONSTRAINT "VecinoServicios_idRubro_fkey";

-- AlterTable
ALTER TABLE "VecinoServicios" DROP COLUMN "idRubro",
ADD COLUMN     "idRubroMercado" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "RubrosMercados" (
    "idRubroMercado" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "RubrosMercados_pkey" PRIMARY KEY ("idRubroMercado")
);

-- AddForeignKey
ALTER TABLE "VecinoServicios" ADD CONSTRAINT "VecinoServicios_idRubroMercado_fkey" FOREIGN KEY ("idRubroMercado") REFERENCES "RubrosMercados"("idRubroMercado") ON DELETE RESTRICT ON UPDATE CASCADE;
