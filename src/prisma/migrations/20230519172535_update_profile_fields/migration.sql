/*
  Warnings:

  - The `profilePic` column on the `Profile` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `homeCountry` column on the `Profile` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `nickname` column on the `Profile` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `namePronunciation` column on the `Profile` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `website` column on the `Profile` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `tdaGradYearBannerVisible` column on the `Profile` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `fullName` on the `Profile` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `pronouns` on the `Profile` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `tdaGradYear` on the `Profile` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `currentLocation` on the `Profile` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `bio` on the `Profile` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "fullName",
ADD COLUMN     "fullName" JSONB NOT NULL,
DROP COLUMN "pronouns",
ADD COLUMN     "pronouns" JSONB NOT NULL,
DROP COLUMN "tdaGradYear",
ADD COLUMN     "tdaGradYear" JSONB NOT NULL,
DROP COLUMN "currentLocation",
ADD COLUMN     "currentLocation" JSONB NOT NULL,
DROP COLUMN "bio",
ADD COLUMN     "bio" JSONB NOT NULL,
DROP COLUMN "profilePic",
ADD COLUMN     "profilePic" JSONB,
DROP COLUMN "homeCountry",
ADD COLUMN     "homeCountry" JSONB,
DROP COLUMN "nickname",
ADD COLUMN     "nickname" JSONB,
DROP COLUMN "namePronunciation",
ADD COLUMN     "namePronunciation" JSONB,
DROP COLUMN "website",
ADD COLUMN     "website" JSONB,
DROP COLUMN "tdaGradYearBannerVisible",
ADD COLUMN     "tdaGradYearBannerVisible" JSONB;
