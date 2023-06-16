/*
  Warnings:

  - Made the column `likes` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dislikes` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `isDraft` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `hasSensitiveTopic` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_userId_fkey";

-- DropIndex
DROP INDEX "Post_userId_key";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "visibleTo" TEXT NOT NULL DEFAULT 'community',
ALTER COLUMN "likes" SET NOT NULL,
ALTER COLUMN "dislikes" SET NOT NULL,
ALTER COLUMN "isDraft" SET NOT NULL,
ALTER COLUMN "isDraft" SET DEFAULT false,
ALTER COLUMN "hasSensitiveTopic" SET NOT NULL,
ALTER COLUMN "hasSensitiveTopic" SET DEFAULT false;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
