-- Отдельная колонка под загруженное фото товара (файл на диске CRM).
-- photo_url остаётся необязательной внешней ссылкой.
ALTER TABLE `products`
  ADD COLUMN `image_path` varchar(255) NULL AFTER `photo_url`;
