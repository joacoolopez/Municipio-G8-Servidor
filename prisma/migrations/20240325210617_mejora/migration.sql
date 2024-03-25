-- CreateTable
CREATE TABLE "VecinoUser" (
    "documentoVecino" INTEGER NOT NULL,
    "password" TEXT NOT NULL,
    "habilitado" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "VecinoUser_pkey" PRIMARY KEY ("documentoVecino")
);
