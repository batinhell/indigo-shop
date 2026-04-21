CREATE TABLE IF NOT EXISTS `userOrganization` (
  `id` varchar(36) NOT NULL,
  `userId` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `inn` varchar(12) NOT NULL,
  `kpp` varchar(9),
  `ogrn` varchar(15),
  `type` varchar(32),
  `address` text,
  `dadataPayload` json,
  `createdAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` timestamp(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `userOrganization_userId_inn_unique` (`userId`, `inn`),
  KEY `userOrganization_userId_idx` (`userId`),
  CONSTRAINT `userOrganization_userId_fk` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE
);
