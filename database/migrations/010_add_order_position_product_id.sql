ALTER TABLE `order_positions`
  ADD COLUMN `product_id` bigint unsigned NULL AFTER `order_id`,
  ADD KEY `order_positions_product_id_idx` (`product_id`),
  ADD CONSTRAINT `order_positions_product_id_fk`
    FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL;
