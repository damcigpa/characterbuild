-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "commenterId" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "characterBuildId" INTEGER NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_characterBuildId_fkey" FOREIGN KEY ("characterBuildId") REFERENCES "CharacterBuild"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
