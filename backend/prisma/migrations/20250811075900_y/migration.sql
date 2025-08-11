/*
  Warnings:

  - You are about to drop the `FollowingList` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PerfumeImg` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PerfumeInfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PerfumeNote` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserInfo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `FollowingList` DROP FOREIGN KEY `FollowingList_userId_fkey`;

-- DropForeignKey
ALTER TABLE `PerfumeImg` DROP FOREIGN KEY `PerfumeImg_perfumeId_fkey`;

-- DropForeignKey
ALTER TABLE `PerfumeInfo` DROP FOREIGN KEY `PerfumeInfo_userId_fkey`;

-- DropForeignKey
ALTER TABLE `PerfumeNote` DROP FOREIGN KEY `PerfumeNote_perfumeId_fkey`;

-- DropTable
DROP TABLE `FollowingList`;

-- DropTable
DROP TABLE `PerfumeImg`;

-- DropTable
DROP TABLE `PerfumeInfo`;

-- DropTable
DROP TABLE `PerfumeNote`;

-- DropTable
DROP TABLE `UserInfo`;

-- CreateTable
CREATE TABLE `user_info` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `nickname` VARCHAR(191) NOT NULL,
    `user_status` ENUM('Y', 'N') NOT NULL DEFAULT 'Y',
    `profile_img` VARCHAR(191) NULL,

    UNIQUE INDEX `user_info_email_key`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `perfume_info` (
    `perfume_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `perfume_name` VARCHAR(191) NOT NULL,
    `brand_name` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `tag` VARCHAR(191) NOT NULL,
    `emotion_tag` VARCHAR(191) NOT NULL,
    `point` INTEGER NOT NULL DEFAULT 0,
    `price` INTEGER NOT NULL,
    `is_public` VARCHAR(191) NOT NULL DEFAULT 'N',
    `perfume_status` VARCHAR(191) NOT NULL DEFAULT 'Y',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`perfume_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `perfume_img` (
    `img_id` INTEGER NOT NULL AUTO_INCREMENT,
    `perfume_id` INTEGER NOT NULL,
    `url_path` VARCHAR(191) NULL,

    PRIMARY KEY (`img_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `perfume_note` (
    `pn_id` INTEGER NOT NULL AUTO_INCREMENT,
    `perfume_id` INTEGER NOT NULL,
    `note_type` ENUM('TOP', 'MIDDLE', 'BASE') NOT NULL,
    `note_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`pn_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `perfume_note_data` (
    `pnd_id` INTEGER NOT NULL AUTO_INCREMENT,
    `note_type` ENUM('TOP', 'MIDDLE', 'BASE') NOT NULL,
    `note_category` VARCHAR(191) NOT NULL,
    `note_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`pnd_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `following_list` (
    `follow_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `follower_id` INTEGER NOT NULL,
    `follow_status` VARCHAR(191) NOT NULL DEFAULT 'Y',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`follow_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `perfume_info` ADD CONSTRAINT `perfume_info_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user_info`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `perfume_img` ADD CONSTRAINT `perfume_img_perfume_id_fkey` FOREIGN KEY (`perfume_id`) REFERENCES `perfume_info`(`perfume_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `perfume_note` ADD CONSTRAINT `perfume_note_perfume_id_fkey` FOREIGN KEY (`perfume_id`) REFERENCES `perfume_info`(`perfume_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `following_list` ADD CONSTRAINT `following_list_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user_info`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `following_list` ADD CONSTRAINT `following_list_follower_id_fkey` FOREIGN KEY (`follower_id`) REFERENCES `user_info`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
