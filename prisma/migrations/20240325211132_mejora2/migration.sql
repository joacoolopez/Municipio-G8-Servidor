/*
  Warnings:

  - The primary key for the `VecinoUser` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "VecinoUser" DROP CONSTRAINT "VecinoUser_pkey",
ALTER COLUMN "documentoVecino" SET DATA TYPE TEXT,
ADD CONSTRAINT "VecinoUser_pkey" PRIMARY KEY ("documentoVecino");

-- AddForeignKey
ALTER TABLE "VecinoUser" ADD CONSTRAINT "VecinoUser_documentoVecino_fkey" FOREIGN KEY ("documentoVecino") REFERENCES "Vecinos"("documento") ON DELETE RESTRICT ON UPDATE CASCADE;
