CREATE TABLE IF NOT EXISTS `site_order_fiscal_receipts` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `site_order_id` bigint unsigned NOT NULL,
  `refund_id` bigint unsigned NULL,
  `receipt_type` varchar(32) NOT NULL,
  `document_id` varchar(64) NOT NULL,
  `operation_id` varchar(64) NULL,
  `status` varchar(32) NOT NULL DEFAULT 'queued',
  `amount` decimal(12,2) NOT NULL,
  `currency` varchar(3) NOT NULL DEFAULT 'RUB',
  `items_snapshot` json NULL,
  `request_payload` json NULL,
  `response_payload` json NULL,
  `error` text NULL,
  `sent_at` timestamp NULL,
  `completed_at` timestamp NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `site_order_fiscal_receipts_document_id_unique` (`document_id`),
  KEY `site_order_fiscal_receipts_order_type_idx` (`site_order_id`, `receipt_type`),
  KEY `site_order_fiscal_receipts_refund_id_idx` (`refund_id`),
  KEY `site_order_fiscal_receipts_status_idx` (`status`),
  KEY `site_order_fiscal_receipts_operation_id_idx` (`operation_id`),
  CONSTRAINT `site_order_fiscal_receipts_site_order_id_fk`
    FOREIGN KEY (`site_order_id`) REFERENCES `site_orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `site_order_fiscal_receipts_refund_id_fk`
    FOREIGN KEY (`refund_id`) REFERENCES `site_order_refunds` (`id`) ON DELETE RESTRICT
);

INSERT INTO `site_order_fiscal_receipts` (
  `site_order_id`,
  `receipt_type`,
  `document_id`,
  `operation_id`,
  `status`,
  `amount`,
  `currency`,
  `response_payload`,
  `error`,
  `sent_at`,
  `completed_at`,
  `created_at`,
  `updated_at`
)
SELECT
  `id`,
  'sale',
  CONCAT('INDIGO-ORDER-', LPAD(`id`, 20, '0')),
  `fiscal_receipt_operation_id`,
  COALESCE(NULLIF(`fiscal_receipt_status`, ''), 'queued'),
  `amount`,
  `currency`,
  `fiscal_receipt_payload`,
  `fiscal_receipt_error`,
  `fiscal_receipt_sent_at`,
  CASE WHEN `fiscal_receipt_status` = 'completed' THEN `updated_at` ELSE NULL END,
  `created_at`,
  `updated_at`
FROM `site_orders`
WHERE `fiscal_receipt_operation_id` IS NOT NULL
   OR `fiscal_receipt_status` IS NOT NULL
ON DUPLICATE KEY UPDATE `operation_id` = VALUES(`operation_id`);
