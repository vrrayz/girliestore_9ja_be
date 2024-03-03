-- AlterTable
ALTER TABLE `User` ADD COLUMN `authProvider` VARCHAR(191) NULL,
    MODIFY `password` VARCHAR(191) NULL;
