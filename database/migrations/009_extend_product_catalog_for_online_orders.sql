ALTER TABLE `products`
  ADD COLUMN `online_order_enabled` boolean NOT NULL DEFAULT false AFTER `status`,
  ADD COLUMN `calculator_type` varchar(32) NOT NULL DEFAULT 'none' AFTER `online_order_enabled`,
  ADD COLUMN `sort` int NOT NULL DEFAULT 0 AFTER `calculator_type`;

CREATE TABLE IF NOT EXISTS `product_options` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint unsigned NOT NULL,
  `key` varchar(64) NOT NULL,
  `label` varchar(255) NOT NULL,
  `type` varchar(32) NOT NULL,
  `is_required` boolean NOT NULL DEFAULT false,
  `affects_price` boolean NOT NULL DEFAULT true,
  `help_text` text,
  `sort` int NOT NULL DEFAULT 0,
  `is_active` boolean NOT NULL DEFAULT true,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `product_options_product_key_unique` (`product_id`, `key`),
  KEY `product_options_product_sort_idx` (`product_id`, `sort`),
  CONSTRAINT `product_options_product_id_fk`
    FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `product_option_values` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `product_option_id` bigint unsigned NOT NULL,
  `key` varchar(64) NOT NULL,
  `label` varchar(255) NOT NULL,
  `sort` int NOT NULL DEFAULT 0,
  `is_active` boolean NOT NULL DEFAULT true,
  `metadata` json,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `product_option_values_option_key_unique` (`product_option_id`, `key`),
  KEY `product_option_values_option_sort_idx` (`product_option_id`, `sort`),
  CONSTRAINT `product_option_values_option_id_fk`
    FOREIGN KEY (`product_option_id`) REFERENCES `product_options` (`id`) ON DELETE CASCADE
);

ALTER TABLE `product_price_rules`
  ADD COLUMN `conditions` json NULL AFTER `size`,
  ADD COLUMN `amount_scope` varchar(32) NOT NULL DEFAULT 'per_unit' AFTER `factor`,
  ADD COLUMN `is_active` boolean NOT NULL DEFAULT true AFTER `amount_scope`;
