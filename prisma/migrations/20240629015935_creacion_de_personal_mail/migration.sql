-- CreateTable
CREATE TABLE "PersonalMail" (
    "legajo" INTEGER NOT NULL,
    "mail" TEXT NOT NULL,

    CONSTRAINT "PersonalMail_pkey" PRIMARY KEY ("legajo")
);

-- AddForeignKey
ALTER TABLE "PersonalMail" ADD CONSTRAINT "PersonalMail_legajo_fkey" FOREIGN KEY ("legajo") REFERENCES "Personal"("legajo") ON DELETE RESTRICT ON UPDATE CASCADE;
