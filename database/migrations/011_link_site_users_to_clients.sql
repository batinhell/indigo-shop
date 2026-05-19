ALTER TABLE `clients`
  ADD COLUMN `site_user_id` varchar(36) NULL AFTER `id`,
  ADD UNIQUE KEY `clients_site_user_id_unique` (`site_user_id`);

INSERT INTO `clients` (`site_user_id`, `name`, `email`, `phone`, `created_at`, `updated_at`)
SELECT
  u.`id`,
  COALESCE(NULLIF(u.`name`, ''), u.`email`, u.`phoneNumber`, 'Клиент сайта'),
  u.`email`,
  u.`phoneNumber`,
  NOW(),
  NOW()
FROM `user` u
LEFT JOIN `clients` c
  ON c.`site_user_id` = u.`id` COLLATE utf8mb4_unicode_ci
  OR c.`email` = u.`email` COLLATE utf8mb4_unicode_ci
  OR (c.`phone` IS NOT NULL AND c.`phone` = u.`phoneNumber` COLLATE utf8mb4_unicode_ci)
WHERE c.`id` IS NULL;
