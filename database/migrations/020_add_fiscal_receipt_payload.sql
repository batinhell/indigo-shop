ALTER TABLE `site_orders`
  ADD COLUMN `fiscal_receipt_payload` json NULL AFTER `fiscal_receipt_error`;
