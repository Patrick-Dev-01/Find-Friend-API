/*
  Warnings:

  - You are about to drop the column `org_id` on the `pets` table. All the data in the column will be lost.
  - Added the required column `orgId` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "pets" DROP CONSTRAINT "pets_org_id_fkey";

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "org_id",
ADD COLUMN     "orgId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Org"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
