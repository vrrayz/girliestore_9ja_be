-- AlterTable
ALTER TABLE `Product` ADD COLUMN `price` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `quantity` INTEGER NOT NULL DEFAULT 0;
