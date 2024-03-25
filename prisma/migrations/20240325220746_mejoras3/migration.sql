-- AlterTable
ALTER TABLE "VecinoUser" ADD COLUMN     "passwordHabilitada" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "password" DROP NOT NULL;
