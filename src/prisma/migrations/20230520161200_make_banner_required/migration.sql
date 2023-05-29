/*
  Warnings:

  - Made the column `tdaGradYearBannerVisible` on table `Profile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "tdaGradYearBannerVisible" SET NOT NULL;
