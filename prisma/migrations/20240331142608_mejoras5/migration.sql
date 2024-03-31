/*
  Warnings:

  - The primary key for the `VecinoComercios` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `VecinoServicios` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "VecinoComercios" DROP CONSTRAINT "VecinoComercios_pkey",
ALTER COLUMN "idComercio" DROP DEFAULT,
ALTER COLUMN "idComercio" SET DATA TYPE TEXT,
ADD CONSTRAINT "VecinoComercios_pkey" PRIMARY KEY ("idComercio");
DROP SEQUENCE "VecinoComercios_idComercio_seq";

-- AlterTable
ALTER TABLE "VecinoServicios" DROP CONSTRAINT "VecinoServicios_pkey",
ALTER COLUMN "idServicio" DROP DEFAULT,
ALTER COLUMN "idServicio" SET DATA TYPE TEXT,
ADD CONSTRAINT "VecinoServicios_pkey" PRIMARY KEY ("idServicio");
DROP SEQUENCE "VecinoServicios_idServicio_seq";
