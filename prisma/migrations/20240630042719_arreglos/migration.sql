/*
  Warnings:

  - You are about to drop the column `fecha` on the `Notificaciones` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Notificaciones" DROP COLUMN "fecha",
ADD COLUMN     "fechahora" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
