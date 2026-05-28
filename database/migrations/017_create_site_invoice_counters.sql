CREATE TABLE IF NOT EXISTS `site_invoice_counters` (
  `invoice_year` int unsigned NOT NULL,
  `last_sequence` int unsigned NOT NULL DEFAULT 0,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`invoice_year`)
);
