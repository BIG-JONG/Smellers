/*
  Warnings:

  - You are about to drop the `FOLLOWINGLIST` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PERFUME_IMG` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PERFUME_INFO` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PERFUME_NOTE` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `USER_INFO` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `FOLLOWINGLIST` DROP FOREIGN KEY `FOLLOWINGLIST_USER_ID_fkey`;

-- DropForeignKey
ALTER TABLE `PERFUME_IMG` DROP FOREIGN KEY `PERFUME_IMG_PERFUME_ID_fkey`;

-- DropForeignKey
ALTER TABLE `PERFUME_INFO` DROP FOREIGN KEY `PERFUME_INFO_USER_ID_fkey`;

-- DropForeignKey
ALTER TABLE `PERFUME_NOTE` DROP FOREIGN KEY `PERFUME_NOTE_PERFUME_ID_fkey`;

-- DropTable
DROP TABLE `FOLLOWINGLIST`;

-- DropTable
DROP TABLE `PERFUME_IMG`;

-- DropTable
DROP TABLE `PERFUME_INFO`;

-- DropTable
DROP TABLE `PERFUME_NOTE`;

-- DropTable
DROP TABLE `USER_INFO`;

-- CreateTable
CREATE TABLE `UserInfo` (
    `userId` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `nickname` VARCHAR(191) NOT NULL,
    `userStatus` ENUM('Y', 'N') NOT NULL DEFAULT 'Y',

    UNIQUE INDEX `UserInfo_email_key`(`email`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PerfumeInfo` (
    `perfumeId` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `perfumeName` VARCHAR(191) NOT NULL,
    `brandName` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `tag` VARCHAR(191) NOT NULL,
    `emotionTag` VARCHAR(191) NOT NULL,
    `point` INTEGER NOT NULL DEFAULT 0,
    `isPublic` VARCHAR(191) NOT NULL DEFAULT 'N',
    `perfumeStatus` VARCHAR(191) NOT NULL DEFAULT 'Y',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`perfumeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PerfumeImg` (
    `perfumeId` INTEGER NOT NULL,
    `url` VARCHAR(191) NULL,

    PRIMARY KEY (`perfumeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PerfumeNote` (
    `pnId` INTEGER NOT NULL AUTO_INCREMENT,
    `perfumeId` INTEGER NOT NULL,
    `noteType` ENUM('TOP', 'MIDDLE', 'BASE') NOT NULL,
    `noteName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`pnId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FollowingList` (
    `userId` INTEGER NOT NULL AUTO_INCREMENT,
    `flowId` INTEGER NULL,
    `flowStatus` VARCHAR(191) NOT NULL DEFAULT 'Y',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PerfumeInfo` ADD CONSTRAINT `PerfumeInfo_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `UserInfo`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PerfumeImg` ADD CONSTRAINT `PerfumeImg_perfumeId_fkey` FOREIGN KEY (`perfumeId`) REFERENCES `PerfumeInfo`(`perfumeId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PerfumeNote` ADD CONSTRAINT `PerfumeNote_perfumeId_fkey` FOREIGN KEY (`perfumeId`) REFERENCES `PerfumeInfo`(`perfumeId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FollowingList` ADD CONSTRAINT `FollowingList_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `UserInfo`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
