/*
  Warnings:

  - Added the required column `name` to the `Armor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Incantation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Sorcery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Talisman` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Weapon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Armor" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Incantation" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Sorcery" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Talisman" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Weapon" ADD COLUMN     "name" TEXT NOT NULL;
