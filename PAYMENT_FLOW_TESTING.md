# Проверка payment flow, возвратов и фискализации

Актуально после коммита `e432325`.

> Все операции ВТБ и Раруса ниже должны выполняться только в тестовом окружении и на минимальной тестовой сумме.

## 1. Развёртывание

1. Получить изменения ветки `main`.
2. Убедиться, что на сервере заданы переменные:

   ```env
   SHOP_API_TOKEN=<тот же токен, что в indigo-crm>
   RARUS_KKT_ENABLED=1
   RARUS_KKT_RETURN_DOC_TYPE=sale_refund
   ```

3. Не выводить значения токенов в логи и консоль.
4. Применить ещё не применённую миграцию:

   ```text
   database/migrations/024_seed_flag_product_pricing.sql
   ```

   Миграции `019–023` также должны быть применены.
5. Выполнить штатную установку зависимостей/сборку проекта на сервере и перезапустить процесс приложения с обновлённым env. Для PM2 при необходимости использовать `--update-env`.
6. Проверить, что `SHOP_API_TOKEN` в shop и CRM совпадает.

## 2. Job processor

Проверить endpoint вручную:

```bash
export SHOP_API_TOKEN='...'
curl --fail-with-body \
  -X POST 'https://ra-indigo.com/api/internal/payment-jobs/process' \
  -H "Authorization: Bearer $SHOP_API_TOKEN" \
  -H 'Content-Type: application/json' \
  --data '{"limit":10}'
```

Ожидаемый формат ответа:

```json
{
  "jobs": {
    "processed": 0,
    "completed": 0,
    "retried": 0,
    "failed": 0
  }
}
```

Числа могут отличаться, если в очереди есть задачи.

После ручной проверки настроить вызов раз в минуту. Одновременно может работать несколько вызовов: задачи забираются с блокировкой и имеют idempotency key.

Проверить в БД:

```sql
SELECT id, job_type, status, attempts, next_attempt_at, last_error
FROM site_order_jobs
ORDER BY id DESC
LIMIT 20;

SELECT id, site_order_id, refund_id, receipt_type, document_id,
       operation_id, status, amount, error
FROM site_order_fiscal_receipts
ORDER BY id DESC
LIMIT 20;
```

## 3. СБП на frontend

1. Добавить флаг в корзину.
2. Заполнить данные покупателя и выбрать оплату как физлицо.
3. Нажать «Оплатить по СБП».
4. Проверить:
   - заказ создаётся без 409 `Product is unavailable`;
   - сумма QR совпадает с корзиной;
   - отображаются QR и countdown;
   - статус опрашивается;
   - после оплаты открывается success-модалка;
   - корзина очищается только после `paid`.
5. Проверить повторную попытку после `failed` или `expired`: создаётся новая Payment Attempt для того же Site Order.

Проверить в БД:

```sql
SELECT id, site_order_id, method, bank_order_id, payment_id,
       requested_amount, charged_amount, status, provider_status,
       expires_at, paid_at
FROM site_order_payment_attempts
WHERE site_order_id = <ORDER_ID>
ORDER BY id;
```

## 4. Чек прихода

После успешной оплаты:

1. Должна появиться запись `receipt_type = 'sale'`.
2. Должна появиться job `send_fiscal_receipt`.
3. После запуска processor чек должен перейти в `completed` либо job — в `retry` с диагностируемой ошибкой.
4. Проверить чек в кабинете Рарус/ОФД:
   - товары;
   - количество;
   - цена и итог;
   - контакт покупателя;
   - признак способа расчёта.
5. Повторно отправить callback/запустить processor и убедиться, что второй чек не появился.

## 5. Карточная оплата

Frontend-переключатель карты пока не добавлен: нужен доступный Figma node/скриншот выбора способа оплаты. Backend можно проверить через API существующего неоплаченного заказа:

```bash
curl --fail-with-body \
  -X POST 'https://ra-indigo.com/api/payments/vtb-card/start' \
  -H 'Content-Type: application/json' \
  -H 'x-order-access-token: <ORDER_ACCESS_TOKEN>' \
  --data '{
    "orderId": <ORDER_ID>,
    "accessToken": "<ORDER_ACCESS_TOKEN>"
  }'
```

Ожидается Payment Attempt с `method = card` и непустым `payUrl`. Открыть `payUrl`, выполнить тестовую оплату и проверить status endpoint:

```bash
curl --fail-with-body \
  'https://ra-indigo.com/api/payments/<PAYMENT_ATTEMPT_ID>/status' \
  -H 'x-order-access-token: <ORDER_ACCESS_TOKEN>'
```

После `paid` должен создаться обычный чек прихода.

## 6. Частичный возврат

Сначала получить `id` позиций заказа:

```sql
SELECT id, name, quantity, unit_price, design_price, total
FROM site_order_items
WHERE site_order_id = <ORDER_ID>
ORDER BY id;
```

Создать возврат только по выбранным позициям и количеству:

```bash
export SHOP_API_TOKEN='...'
curl --fail-with-body \
  -X POST 'https://ra-indigo.com/api/internal/site-orders/<ORDER_ID>/refunds' \
  -H "Authorization: Bearer $SHOP_API_TOKEN" \
  -H 'Content-Type: application/json' \
  --data '{
    "type": "partial",
    "refundId": "TEST-PARTIAL-001",
    "requestedBy": "manager@example.com",
    "reason": "Тестовый частичный возврат",
    "items": [
      {"orderItemId": <ORDER_ITEM_ID>, "quantity": 1}
    ]
  }'
```

Проверить:

- сумма рассчитана сервером;
- `items_snapshot` содержит выбранную позицию;
- повторный запрос с тем же `refundId` не создаёт новый возврат;
- нельзя вернуть больше доступного количества;
- произвольное поле `amount` не управляет суммой возврата.

## 7. Полный возврат

```bash
curl --fail-with-body \
  -X POST 'https://ra-indigo.com/api/internal/site-orders/<ORDER_ID>/refunds' \
  -H "Authorization: Bearer $SHOP_API_TOKEN" \
  -H 'Content-Type: application/json' \
  --data '{
    "type": "full",
    "refundId": "TEST-FULL-001",
    "requestedBy": "manager@example.com",
    "reason": "Тестовый полный возврат"
  }'
```

Сервер самостоятельно выберет весь ещё не возвращённый остаток заказа.

## 8. Чек возврата прихода

После статуса банковского возврата `completed`:

1. Должен создаться fiscal receipt:
   - `receipt_type = return`;
   - `doc_type` при отправке — `sale_refund`;
   - `refund_id` заполнен;
   - `items_snapshot` содержит конкретные позиции и количество.
2. Должна создаться durable job.
3. Запустить processor.
4. Проверить переход чека в `completed`.
5. Проверить в Рарус/ОФД именно чек возврата прихода и совпадение позиций с заявлением менеджера.
6. Повторный polling возврата и повторный processor не должны создать второй чек.

## 9. Негативные проверки

- Internal API без `SHOP_API_TOKEN` возвращает 401.
- Возврат неоплаченного заказа возвращает 409.
- Частичный возврат без `items` возвращает 400.
- Нулевое, отрицательное и дробное количество возвращает 400.
- Неизвестный `orderItemId` возвращает 400.
- Количество больше остатка возвращает 409.
- Суммарный возврат не превышает подтверждённую сумму ВТБ.

## 10. Пока не завершено

- UI возврата в `indigo-crm`.
- Изменение статуса заказа на «Возврат»/«Частичный возврат».
- Email покупателю после подтверждения возврата.
- Frontend-переключатель СБП/карта — требуется рабочий Figma context или скриншот.
- Настройка реального cron/scheduler на сервере.
