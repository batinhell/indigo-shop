CREATE TABLE IF NOT EXISTS `userEmailConfirmationToken` (
  `id` varchar(36) NOT NULL,
  `userId` varchar(36) NOT NULL,
  `email` varchar(255) NOT NULL,
  `tokenHash` char(64) NOT NULL,
  `expiresAt` timestamp(3) NOT NULL,
  `usedAt` timestamp(3) NULL,
  `createdAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `userEmailConfirmationToken_tokenHash_unique` (`tokenHash`),
  KEY `userEmailConfirmationToken_userId_idx` (`userId`),
  KEY `userEmailConfirmationToken_email_idx` (`email`),
  KEY `userEmailConfirmationToken_expiresAt_idx` (`expiresAt`),
  CONSTRAINT `userEmailConfirmationToken_userId_fk`
    FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE
);
