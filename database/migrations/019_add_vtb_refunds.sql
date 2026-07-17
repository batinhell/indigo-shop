ALTER TABLE `site_orders`
  ADD COLUMN `vtb_payment_id` varchar(128) NULL AFTER `vtb_qr_id`,
  ADD KEY `site_orders_vtb_payment_id_idx` (`vtb_payment_id`);

CREATE TABLE IF NOT EXISTS `site_order_refunds` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `site_order_id` bigint unsigned NOT NULL,
  `refund_id` varchar(64) NOT NULL,
  `vtb_payment_id` varchar(128) NOT NULL,
  `amount` decimal(12,2) NOT NULL,
  `currency` varchar(3) NOT NULL DEFAULT 'RUB',
  `status` varchar(32) NOT NULL DEFAULT 'pending',
  `requested_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `completed_at` timestamp NULL,
  `payload` json NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `site_order_refunds_refund_id_unique` (`refund_id`),
  KEY `site_order_refunds_site_order_id_idx` (`site_order_id`),
  KEY `site_order_refunds_status_idx` (`status`),
  CONSTRAINT `site_order_refunds_site_order_id_fk`
    FOREIGN KEY (`site_order_id`) REFERENCES `site_orders` (`id`) ON DELETE CASCADE
);
