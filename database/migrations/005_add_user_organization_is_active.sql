ALTER TABLE `userOrganization`
ADD COLUMN `isActive` boolean NOT NULL DEFAULT false AFTER `address`;
