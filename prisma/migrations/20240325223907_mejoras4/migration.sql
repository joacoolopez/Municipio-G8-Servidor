/*
  Warnings:

  - You are about to drop the column `passwordHabilitada` on the `VecinoUser` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "VecinoUser" DROP COLUMN "passwordHabilitada",
ADD COLUMN     "passwordActiva" BOOLEAN NOT NULL DEFAULT false;
