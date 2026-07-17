CREATE TABLE IF NOT EXISTS `site_order_payment_attempts` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `site_order_id` bigint unsigned NOT NULL,
  `provider` varchar(32) NOT NULL DEFAULT 'vtb',
  `method` varchar(32) NOT NULL DEFAULT 'sbp',
  `bank_order_id` varchar(64) NOT NULL,
  `payment_id` varchar(128) NULL,
  `qr_id` varchar(128) NULL,
  `requested_amount` decimal(12,2) NOT NULL,
  `charged_amount` decimal(12,2) NULL,
  `currency` varchar(3) NOT NULL DEFAULT 'RUB',
  `status` varchar(32) NOT NULL DEFAULT 'creating',
  `provider_status` varchar(64) NULL,
  `provider_payload` json NULL,
  `expires_at` timestamp NULL,
  `paid_at` timestamp NULL,
  `failed_at` timestamp NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `site_order_payment_attempts_bank_order_id_unique` (`bank_order_id`),
  KEY `site_order_payment_attempts_order_status_idx` (`site_order_id`, `status`),
  KEY `site_order_payment_attempts_payment_id_idx` (`payment_id`),
  KEY `site_order_payment_attempts_qr_id_idx` (`qr_id`),
  CONSTRAINT `site_order_payment_attempts_site_order_id_fk`
    FOREIGN KEY (`site_order_id`) REFERENCES `site_orders` (`id`) ON DELETE CASCADE
);

INSERT INTO `site_order_payment_attempts` (
  `site_order_id`,
  `provider`,
  `method`,
  `bank_order_id`,
  `payment_id`,
  `qr_id`,
  `requested_amount`,
  `currency`,
  `status`,
  `provider_payload`,
  `expires_at`,
  `paid_at`,
  `failed_at`,
  `created_at`,
  `updated_at`
)
SELECT
  `id`,
  'vtb',
  'sbp',
  `order_number`,
  `vtb_payment_id`,
  `vtb_qr_id`,
  `amount`,
  `currency`,
  `payment_status`,
  `payload`,
  `expires_at`,
  `paid_at`,
  CASE WHEN `payment_status` = 'failed' THEN `updated_at` ELSE NULL END,
  `created_at`,
  `updated_at`
FROM `site_orders`
WHERE `payment_provider` = 'vtb_sbp'
  AND `order_number` IS NOT NULL
ON DUPLICATE KEY UPDATE `site_order_id` = VALUES(`site_order_id`);

ALTER TABLE `site_order_refunds`
  ADD COLUMN `payment_attempt_id` bigint unsigned NULL AFTER `site_order_id`,
  ADD COLUMN `refund_type` varchar(32) NOT NULL DEFAULT 'partial' AFTER `currency`,
  ADD COLUMN `reason` text NULL AFTER `refund_type`,
  ADD COLUMN `items_snapshot` json NULL AFTER `reason`,
  ADD COLUMN `requested_by` varchar(128) NULL AFTER `items_snapshot`,
  ADD COLUMN `provider_status` varchar(64) NULL AFTER `status`,
  ADD KEY `site_order_refunds_payment_attempt_id_idx` (`payment_attempt_id`),
  ADD CONSTRAINT `site_order_refunds_payment_attempt_id_fk`
    FOREIGN KEY (`payment_attempt_id`) REFERENCES `site_order_payment_attempts` (`id`) ON DELETE RESTRICT;

UPDATE `site_order_refunds` AS `refund`
JOIN `site_order_payment_attempts` AS `attempt`
  ON `attempt`.`site_order_id` = `refund`.`site_order_id`
  AND `attempt`.`payment_id` = `refund`.`vtb_payment_id`
SET `refund`.`payment_attempt_id` = `attempt`.`id`
WHERE `refund`.`payment_attempt_id` IS NULL;
