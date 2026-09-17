-- Гарантируем UTF-8 для соединения, иначе кириллица в сиде запишется в неверной кодировке.
SET NAMES utf8mb4;

CREATE TABLE IF NOT EXISTS `product_categories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `slug` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `sort` int NOT NULL DEFAULT 0,
  `status` varchar(32) NOT NULL DEFAULT 'active',
  `created_at` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `product_categories_slug_unique` (`slug`),
  KEY `product_categories_status_sort_idx` (`status`, `sort`)
);

-- Сид: переносим уже существующие категории товаров, чтобы каталог не «повис».
INSERT INTO `product_categories` (`slug`, `name`, `description`, `sort`, `status`)
SELECT DISTINCT p.`category`, p.`category`, NULL, 0, 'active'
FROM `products` p
WHERE p.`category` IS NOT NULL
  AND p.`category` <> ''
  AND NOT EXISTS (
    SELECT 1 FROM `product_categories` c WHERE c.`slug` = p.`category`
  );

-- Человекочитаемое название и описание для известной категории.
UPDATE `product_categories`
SET `name` = 'Текстиль',
    `description` = 'Нанесение на футболки, шопперы, кепки, флаги, нашивки'
WHERE `slug` = 'textile';
