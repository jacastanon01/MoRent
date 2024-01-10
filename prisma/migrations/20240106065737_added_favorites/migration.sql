/*
  Warnings:

  - You are about to drop the `UserFavoriteCar` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserFavoriteCar" DROP CONSTRAINT "UserFavoriteCar_carId_fkey";

-- DropForeignKey
ALTER TABLE "UserFavoriteCar" DROP CONSTRAINT "UserFavoriteCar_userId_fkey";

-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "discountedPrice" DOUBLE PRECISION;

-- DropTable
DROP TABLE "UserFavoriteCar";

-- CreateTable
CREATE TABLE "_favoritedByUsers" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_favoritedByUsers_AB_unique" ON "_favoritedByUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_favoritedByUsers_B_index" ON "_favoritedByUsers"("B");

-- AddForeignKey
ALTER TABLE "_favoritedByUsers" ADD CONSTRAINT "_favoritedByUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Car"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_favoritedByUsers" ADD CONSTRAINT "_favoritedByUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
