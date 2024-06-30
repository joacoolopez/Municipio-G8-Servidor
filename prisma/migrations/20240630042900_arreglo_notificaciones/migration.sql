/*
  Warnings:

  - You are about to drop the column `fechahora` on the `Notificaciones` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Notificaciones" DROP CONSTRAINT "Notificaciones_documentoVecino_fkey";

-- DropForeignKey
ALTER TABLE "Notificaciones" DROP CONSTRAINT "Notificaciones_legajo_fkey";

-- AlterTable
ALTER TABLE "Notificaciones" DROP COLUMN "fechahora",
ADD COLUMN     "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "documentoVecino" DROP NOT NULL,
ALTER COLUMN "legajo" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Notificaciones" ADD CONSTRAINT "Notificaciones_documentoVecino_fkey" FOREIGN KEY ("documentoVecino") REFERENCES "VecinoUser"("documentoVecino") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notificaciones" ADD CONSTRAINT "Notificaciones_legajo_fkey" FOREIGN KEY ("legajo") REFERENCES "Personal"("legajo") ON DELETE SET NULL ON UPDATE CASCADE;
