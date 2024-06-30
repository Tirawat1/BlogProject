-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_blogId_fkey";

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "blogId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE SET NULL ON UPDATE CASCADE;
