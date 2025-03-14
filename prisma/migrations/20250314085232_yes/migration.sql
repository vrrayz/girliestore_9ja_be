/*
  Warnings:

  - A unique constraint covering the columns `[deviceId]` on the table `ProductView` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `ProductView_deviceId_key` ON `ProductView`(`deviceId`);
