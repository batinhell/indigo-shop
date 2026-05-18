ALTER TABLE `products`
  ADD COLUMN `online_order_enabled` boolean NOT NULL DEFAULT false AFTER `status`,
  ADD COLUMN `calculator_type` varchar(32) NOT NULL DEFAULT 'none' AFTER `online_order_enabled`,
  ADD COLUMN `sort` int NOT NULL DEFAULT 0 AFTER `calculator_type`;

ALTER TABLE `product_price_rules`
  ADD COLUMN `conditions` json NULL AFTER `size`,
  ADD COLUMN `amount_scope` varchar(32) NOT NULL DEFAULT 'per_unit' AFTER `factor`,
  ADD COLUMN `is_active` boolean NOT NULL DEFAULT true AFTER `amount_scope`;
