/*
  Warnings:

  - You are about to drop the column `contacto` on the `VecinoServicios` table. All the data in the column will be lost.
  - Added the required column `direccion` to the `VecinoServicios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idRubro` to the `VecinoServicios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minutoApertura` to the `VecinoServicios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minutoCierre` to the `VecinoServicios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefono` to the `VecinoServicios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VecinoServicios" DROP COLUMN "contacto",
ADD COLUMN     "direccion" TEXT NOT NULL,
ADD COLUMN     "idRubro" INTEGER NOT NULL,
ADD COLUMN     "minutoApertura" TEXT NOT NULL,
ADD COLUMN     "minutoCierre" TEXT NOT NULL,
ADD COLUMN     "telefono" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "VecinoServicios" ADD CONSTRAINT "VecinoServicios_idRubro_fkey" FOREIGN KEY ("idRubro") REFERENCES "Rubros"("idRubro") ON DELETE RESTRICT ON UPDATE CASCADE;
