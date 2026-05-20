CREATE TABLE IF NOT EXISTS `site_order_items` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `site_order_id` bigint unsigned NOT NULL,
  `product_id` bigint unsigned NULL,
  `name` varchar(255) NOT NULL,
  `description` text NULL,
  `quantity` int unsigned NOT NULL DEFAULT 1,
  `unit_price` decimal(12,2) NOT NULL DEFAULT 0.00,
  `design_price` decimal(12,2) NOT NULL DEFAULT 0.00,
  `total` decimal(12,2) NOT NULL DEFAULT 0.00,
  `payload` json NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `site_order_items_site_order_id_idx` (`site_order_id`),
  KEY `site_order_items_product_id_idx` (`product_id`),
  CONSTRAINT `site_order_items_site_order_id_fk`
    FOREIGN KEY (`site_order_id`) REFERENCES `site_orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `site_order_items_product_id_fk`
    FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL
);
