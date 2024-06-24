/*
  Warnings:

  - Added the required column `idReclamoImagen` to the `Reclamos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reclamos" ADD COLUMN     "idReclamoImagen" TEXT NOT NULL;
