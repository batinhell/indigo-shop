CREATE TABLE IF NOT EXISTS `products` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `category` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `status` varchar(32) NOT NULL DEFAULT 'draft',
  `price_from` text,
  `price_unit` varchar(32),
  `min_circulation` text,
  `production_time` varchar(255),
  `formats_sizes` text,
  `materials` text,
  `additional_options` text,
  `short_description` text,
  `photo_url` text,
  `seo_title` varchar(255),
  `seo_description` text,
  `created_at` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `products_slug_unique` (`slug`),
  KEY `products_status_category_name_idx` (`status`, `category`, `name`)
);

CREATE TABLE IF NOT EXISTS `product_price_rules` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint unsigned NOT NULL,
  `type` varchar(32) NOT NULL,
  `key` varchar(255),
  `label` varchar(255) NOT NULL,
  `size` varchar(64),
  `min_quantity` int unsigned,
  `max_quantity` int unsigned,
  `price` decimal(12,2),
  `percent` decimal(8,2),
  `factor` decimal(8,4),
  `sort` int NOT NULL DEFAULT 0,
  `created_at` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `product_price_rules_product_sort_idx` (`product_id`, `sort`, `id`),
  CONSTRAINT `product_price_rules_product_id_fk`
    FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
);
