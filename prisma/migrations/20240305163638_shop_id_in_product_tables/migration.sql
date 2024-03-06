/*
  Warnings:

  - Added the required column `shopId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Product` ADD COLUMN `shopId` INTEGER NOT NULL;
