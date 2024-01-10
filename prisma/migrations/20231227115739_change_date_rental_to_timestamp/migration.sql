/*
  Warnings:

  - Changed the type of `pickUpTime` on the `Rental` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `dropOffTime` on the `Rental` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Rental" DROP COLUMN "pickUpTime",
ADD COLUMN     "pickUpTime" TIMESTAMPTZ NOT NULL,
DROP COLUMN "dropOffTime",
ADD COLUMN     "dropOffTime" TIMESTAMPTZ NOT NULL,
ALTER COLUMN "startDate" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "endDate" SET DATA TYPE TIMESTAMPTZ;
