-- CreateTable
CREATE TABLE "CharacterBuildLike" (
    "userId" INTEGER NOT NULL,
    "characterBuildId" INTEGER NOT NULL,

    CONSTRAINT "CharacterBuildLike_pkey" PRIMARY KEY ("userId","characterBuildId")
);

-- AddForeignKey
ALTER TABLE "CharacterBuildLike" ADD CONSTRAINT "CharacterBuildLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterBuildLike" ADD CONSTRAINT "CharacterBuildLike_characterBuildId_fkey" FOREIGN KEY ("characterBuildId") REFERENCES "CharacterBuild"("id") ON DELETE CASCADE ON UPDATE CASCADE;
