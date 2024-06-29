/*
  Warnings:

  - Added the required column `idDenunciaPruebas` to the `Denuncias` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Denuncias" ADD COLUMN     "idDenunciaPruebas" TEXT NOT NULL;
