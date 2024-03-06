/*
  Warnings:

  - You are about to drop the column `productId` on the `Shop` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Shop_productId_fkey` ON `Shop`;

-- AlterTable
ALTER TABLE `Shop` DROP COLUMN `productId`;
