CREATE TABLE IF NOT EXISTS `userRecipient` (
  `id` varchar(36) NOT NULL,
  `userId` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phoneNumber` varchar(16),
  `createdAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` timestamp(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userRecipient_userId_idx` (`userId`),
  CONSTRAINT `userRecipient_userId_fk` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE
);
