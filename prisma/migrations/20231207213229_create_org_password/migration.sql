/*
  Warnings:

  - Added the required column `password` to the `Org` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Org" ADD COLUMN     "password" TEXT NOT NULL;
