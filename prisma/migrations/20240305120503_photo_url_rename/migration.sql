/*
  Warnings:

  - You are about to drop the column `photo` on the `Shop` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Shop` DROP COLUMN `photo`,
    ADD COLUMN `photo_url` VARCHAR(191) NULL;
