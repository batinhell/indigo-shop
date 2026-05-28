ALTER TABLE `site_orders`
  ADD COLUMN `fiscal_receipt_status` varchar(32) NULL AFTER `payment_status`,
  ADD COLUMN `fiscal_receipt_operation_id` varchar(64) NULL AFTER `fiscal_receipt_status`,
  ADD COLUMN `fiscal_receipt_sent_at` timestamp NULL AFTER `fiscal_receipt_operation_id`,
  ADD COLUMN `fiscal_receipt_error` text NULL AFTER `fiscal_receipt_sent_at`,
  ADD KEY `site_orders_fiscal_receipt_status_idx` (`fiscal_receipt_status`),
  ADD KEY `site_orders_fiscal_receipt_operation_id_idx` (`fiscal_receipt_operation_id`);
