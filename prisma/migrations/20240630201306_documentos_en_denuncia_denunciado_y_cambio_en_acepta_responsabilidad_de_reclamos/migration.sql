/*
  Warnings:

  - Changed the type of `aceptaResponsabilidad` on the `Denuncias` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "DenunciaDenunciado" ADD COLUMN     "documento" TEXT;

-- AlterTable
ALTER TABLE "Denuncias" DROP COLUMN "aceptaResponsabilidad",
ADD COLUMN     "aceptaResponsabilidad" BOOLEAN NOT NULL;
