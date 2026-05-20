ALTER TABLE `site_orders`
  ADD COLUMN `access_token` varchar(64) NULL AFTER `site_user_id`,
  ADD UNIQUE KEY `site_orders_access_token_unique` (`access_token`);
