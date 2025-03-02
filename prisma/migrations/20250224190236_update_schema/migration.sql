-- CreateTable
CREATE TABLE "CharacterBuild" (
    "name" TEXT NOT NULL,
    "id" SERIAL NOT NULL,

    CONSTRAINT "CharacterBuild_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Armor" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "characterBuildId" INTEGER,

    CONSTRAINT "Armor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Weapon" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "characterBuildId" INTEGER,

    CONSTRAINT "Weapon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Talisman" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "characterBuildId" INTEGER,

    CONSTRAINT "Talisman_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sorcery" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "characterBuildId" INTEGER,

    CONSTRAINT "Sorcery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Incantation" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "characterBuildId" INTEGER,

    CONSTRAINT "Incantation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Armor" ADD CONSTRAINT "Armor_characterBuildId_fkey" FOREIGN KEY ("characterBuildId") REFERENCES "CharacterBuild"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Weapon" ADD CONSTRAINT "Weapon_characterBuildId_fkey" FOREIGN KEY ("characterBuildId") REFERENCES "CharacterBuild"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Talisman" ADD CONSTRAINT "Talisman_characterBuildId_fkey" FOREIGN KEY ("characterBuildId") REFERENCES "CharacterBuild"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sorcery" ADD CONSTRAINT "Sorcery_characterBuildId_fkey" FOREIGN KEY ("characterBuildId") REFERENCES "CharacterBuild"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incantation" ADD CONSTRAINT "Incantation_characterBuildId_fkey" FOREIGN KEY ("characterBuildId") REFERENCES "CharacterBuild"("id") ON DELETE SET NULL ON UPDATE CASCADE;
