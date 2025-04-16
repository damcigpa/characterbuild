-- DropIndex
DROP INDEX "User_pass_key";

-- AlterTable
ALTER TABLE "CharacterBuild" ADD COLUMN     "creatorId" INTEGER;

-- AddForeignKey
ALTER TABLE "CharacterBuild" ADD CONSTRAINT "CharacterBuild_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
