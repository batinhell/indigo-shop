CREATE TABLE IF NOT EXISTS `site_order_files` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `site_order_id` bigint unsigned NOT NULL,
  `original_name` varchar(255) NOT NULL,
  `path` varchar(255) NOT NULL,
  `url` varchar(255) NULL,
  `mime_type` varchar(255) NULL,
  `size` bigint unsigned NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `site_order_files_site_order_id_idx` (`site_order_id`),
  CONSTRAINT `site_order_files_site_order_id_fk`
    FOREIGN KEY (`site_order_id`) REFERENCES `site_orders` (`id`) ON DELETE CASCADE
);
