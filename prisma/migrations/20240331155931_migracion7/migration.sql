/*
  Warnings:

  - You are about to drop the column `nombre` on the `VecinoComercios` table. All the data in the column will be lost.
  - Added the required column `nombreComercio` to the `VecinoComercios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tituloServicio` to the `VecinoServicios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VecinoComercios" DROP COLUMN "nombre",
ADD COLUMN     "nombreComercio" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "VecinoServicios" ADD COLUMN     "tituloServicio" TEXT NOT NULL;
