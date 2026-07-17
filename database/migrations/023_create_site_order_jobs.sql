CREATE TABLE IF NOT EXISTS `site_order_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `job_type` varchar(64) NOT NULL,
  `idempotency_key` varchar(128) NOT NULL,
  `site_order_id` bigint unsigned NOT NULL,
  `payment_attempt_id` bigint unsigned NULL,
  `refund_id` bigint unsigned NULL,
  `fiscal_receipt_id` bigint unsigned NULL,
  `status` varchar(32) NOT NULL DEFAULT 'pending',
  `payload` json NULL,
  `attempts` int unsigned NOT NULL DEFAULT 0,
  `max_attempts` int unsigned NOT NULL DEFAULT 20,
  `next_attempt_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `locked_at` timestamp NULL,
  `locked_by` varchar(128) NULL,
  `last_error` text NULL,
  `completed_at` timestamp NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `site_order_jobs_idempotency_key_unique` (`idempotency_key`),
  KEY `site_order_jobs_ready_idx` (`status`, `next_attempt_at`),
  KEY `site_order_jobs_site_order_id_idx` (`site_order_id`),
  KEY `site_order_jobs_payment_attempt_id_idx` (`payment_attempt_id`),
  KEY `site_order_jobs_refund_id_idx` (`refund_id`),
  KEY `site_order_jobs_fiscal_receipt_id_idx` (`fiscal_receipt_id`),
  CONSTRAINT `site_order_jobs_site_order_id_fk`
    FOREIGN KEY (`site_order_id`) REFERENCES `site_orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `site_order_jobs_payment_attempt_id_fk`
    FOREIGN KEY (`payment_attempt_id`) REFERENCES `site_order_payment_attempts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `site_order_jobs_refund_id_fk`
    FOREIGN KEY (`refund_id`) REFERENCES `site_order_refunds` (`id`) ON DELETE CASCADE,
  CONSTRAINT `site_order_jobs_fiscal_receipt_id_fk`
    FOREIGN KEY (`fiscal_receipt_id`) REFERENCES `site_order_fiscal_receipts` (`id`) ON DELETE CASCADE
);

INSERT INTO `site_order_jobs` (
  `job_type`,
  `idempotency_key`,
  `site_order_id`,
  `fiscal_receipt_id`,
  `status`,
  `attempts`,
  `max_attempts`,
  `next_attempt_at`,
  `created_at`,
  `updated_at`
)
SELECT
  'send_fiscal_receipt',
  CONCAT('fiscal:', `receipt`.`id`, ':send'),
  `receipt`.`site_order_id`,
  `receipt`.`id`,
  'pending',
  0,
  20,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
FROM `site_order_fiscal_receipts` AS `receipt`
WHERE `receipt`.`status` NOT IN ('completed', 'failed')
ON DUPLICATE KEY UPDATE `site_order_id` = VALUES(`site_order_id`);
