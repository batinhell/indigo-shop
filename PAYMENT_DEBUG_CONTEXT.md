# Контекст по интеграции оплаты ВТБ СБП QR и Rarus KKT

Дата: 2026-06-27
Проект: `/home/batcat/projects/indigo-shop`

## Важные проектные ограничения

- Не запускать build и dev server без явного разрешения пользователя (см. `AGENTS.md`).
- Прод домен: `https://ra-indigo.com/`.
- Nuxt 4 / Nitro, серверные API лежат в `server/api`.

## Цель текущих работ

Прикрутить оплату **только по QR СБП через ВТБ** и онлайн-кассу Rarus.

Изначально пробовали card/payUrl через `e-commerce/v1/orders`, но пользователь уточнил, что нужна именно оплата QR. Поэтому каноническая модель сейчас: **VTB SBP dynamic QR only**.

## Выданные тестовые доступы ВТБ

```env
VTB_PAYMENT_SBP_BASE_URL=https://test3.api.vtb.ru:8443/openapi/smb/efcp/sbp-gateway/v1/
VTB_PAYMENT_TOKEN_URL=https://epa-ift-sbp.vtb.ru:443/passport/oauth2/token
VTB_PAYMENT_CLIENT_ID=r252.apptw.10f9b6c5-eb8d-4ca4-b046-6933b0a7f844@ext.vtb.ru
VTB_PAYMENT_CLIENT_SECRET="A74r5,H8vnmZeB'T"
VTB_PAYMENT_MERCHANT_AUTHORIZATION=01810cd5-a713-4236-b677-f99404c99e60
VTB_PAYMENT_RETURN_URL=https://ra-indigo.com/payment
VTB_PAYMENT_CALLBACK_URL=https://ra-indigo.com/api/payments/vtb-sbp/callback
VTB_PAYMENT_QR_TTL_SECONDS=1200
```

Важно: `VTB_PAYMENT_CLIENT_SECRET` должен быть в двойных кавычках из-за апострофа.

Старые переменные больше не нужны:

```env
VTB_PAYMENT_BASE_URL
VTB_PAYMENT_USERNAME
VTB_PAYMENT_PASSWORD
VTB_PAYMENT_FAIL_URL
```

## Rarus KKT тестовые доступы

```env
RARUS_KKT_ENABLED=1
RARUS_KKT_BASE_URL=https://kkm.rarus-cloud.ru
RARUS_KKT_API_VERSION=1.1.7
RARUS_KKT_API_KEY=315DEFA3-EBB3-4A24-8F23-AE709BE8130B_2
RARUS_KKT_INN=6234117358
RARUS_KKT_TAX_SYSTEM=OSN
RARUS_KKT_TAX=none
RARUS_KKT_SIGN_METHOD_CALCULATION=full_prepayment
RARUS_KKT_SIGN_CALCULATION_OBJECT=commodity
RARUS_KKT_TAG_1011=2
```

## Что было изменено в коде

### Основная модель оплаты

Оплата хранится на `site_orders`, отдельной payment entity нет. Route `/api/payments/:paymentId/status` оставлен для совместимости, но внутри `paymentId` трактуется как `site_orders.id` (`siteOrderId`).

### Важные файлы

- `server/api/payments/vtb-sbp/start.post.js`
  - Создаёт/находит site order.
  - Помечает заказ как pending (`markSiteOrderPaymentPending`).
  - Создаёт dynamic QR через `getVtbDynamicQr(orderNumber, { amount, description })`.
  - Сохраняет `vtb_qr_id`, `expires_at`, payload.payment.vtb.qr.
  - Возвращает `payment.id = siteOrderId`, `qrPayload`, `qrId`, `amount`.

- `server/api/payments/[paymentId]/status.get.js`
  - Thin controller.
  - Проверяет expired.
  - Вызывает `refreshVtbPaymentStatus(database, siteOrder)`.

- `server/api/payments/vtb-sbp/callback.post.js`
  - Принимает callback.
  - Находит `site_orders` по `order_number`/`vtb_qr_id`.
  - Вызывает `refreshVtbPaymentStatus(database, siteOrder, { payloadPatch: { callback: body } })`.
  - Старый `callback.get.js` удалён.

- `server/utils/order-payment.js`
  - Переименовано, чтобы не врать про payment entity:
    - `markSiteOrderPaymentPending`
    - `getSiteOrderPaymentState`
    - `updateSiteOrderPaymentStatus`
    - `settleSiteOrderPayment`
    - `saveSiteOrderVtbQr`
  - Payload пишется через `mergeVtbPaymentPayload` в стабильный namespace:
    ```js
    payload.payment.provider = 'vtb_sbp'
    payload.payment.vtb = {
      qr,
      lastStatus,
      callbacks,
      lastError
    }
    ```

- VTB split modules:
  - `server/utils/vtb-config.js` — env/runtime config, mock flags.
  - `server/utils/vtb-http-client.js` — OAuth token cache + raw HTTP client.
  - `server/utils/vtb-sbp-api.js` — `qr/dynamics`, `qr/dynamics/info`, mock responses.
  - `server/utils/vtb-payment-status-mapper.js` — VTB QR statuses → internal payment status.
  - `server/utils/vtb-payment-status.js` — canonical provider orchestration (`refreshVtbPaymentStatus`).
  - Старый `server/utils/vtb-payment.js` удалён.

- Frontend:
  - `app/components/cart/CartSummary.vue` кнопка: `Оплатить по СБП`.
  - `app/pages/cart.vue` вызывает `/api/payments/vtb-sbp/start`, показывает `PaymentQrModal`, редиректа на payUrl нет.
  - `app/components/PaymentQrModal.vue` только QR/payload flow, card/payUrl UI удалён.
  - `app/pages/payment.vue` текст под СБП QR.

- `server/utils/rarus-kkt.js`
  - `createReceiptId` поправлен под требование Rarus 32–40 символов:
    ```js
    `INDIGO-ORDER-${String(order.id).padStart(20, '0')}`.slice(0, 40)
    ```

## Последние проверки локально

Запускался только ESLint по изменённым файлам:

```bash
npx eslint server/utils/vtb-config.js server/utils/vtb-http-client.js server/utils/vtb-payment-status-mapper.js server/utils/vtb-payment-status.js server/utils/vtb-sbp-api.js server/utils/order-payment.js server/api/payments/vtb-sbp/start.post.js server/api/payments/vtb-sbp/callback.post.js server/api/payments/[paymentId]/status.get.js app/pages/cart.vue app/components/PaymentQrModal.vue app/components/cart/CartSummary.vue app/pages/payment.vue
```

Проходил без ошибок.

## Что происходило на проде

Пользователь задеплоил, сначала забыл сделать build — прод отдавал старую ошибку:

```txt
Не настроены реквизиты ВТБ для оплаты
```

Это было от старого кода. После build ошибка изменилась на `500 Server Error`.

В PM2 logs:

```txt
[request error] [unhandled] [POST] https://ra-indigo.com/api/payments/vtb-sbp/start
[TypeError: fetch failed] {
  cause: Error: unable to get local issuer certificate
  code: 'UNABLE_TO_GET_ISSUER_CERT_LOCALLY'
}
```

То есть проблема сейчас не в коде, а в TLS trust store сервера: Node не доверяет сертификатной цепочке тестового ВТБ endpoint-а.

## Что ВТБ прислал по сертификатам

Нужно добавить сертификаты НУЦ:

- Корневой: `http://rostelecom.ru/cdp/rootca_ssl_rsa2022.crt`
- Промежуточный: `http://rostelecom.ru/cdp/subca_ssl_rsa2022.crt`
- Промежуточный: `http://nuc-cdp.digital.gov.ru/cdp/subca_ssl_rsa2024.crt`

У пользователя `developer` нет sudo для системного хранилища:

```txt
Sorry, user developer is not allowed to execute '/usr/bin/mkdir -p /usr/local/share/ca-certificates/nuc' as root
```

Поэтому пытались использовать `NODE_EXTRA_CA_CERTS`.

## Текущее состояние диагностики сертификатов

На сервере:

```bash
cd /home/developer/certs/vtb-nuc
file rootca_ssl_rsa2022.crt subca_ssl_rsa2022.crt subca_ssl_rsa2024.crt
```

Показало:

```txt
rootca_ssl_rsa2022.crt: PEM certificate
subca_ssl_rsa2022.crt:  PEM certificate
subca_ssl_rsa2024.crt:  PEM certificate
```

`head -5 rootca_ssl_rsa2022.crt` начинается с:

```txt
-----BEGIN CERTIFICATE-----
```

Сначала `cat *.crt > vtb-nuc-chain.pem` дал 6 сертификатов, потому что захватил старый `vtb-nuc-chain.crt`. Нужно собирать явно:

```bash
cd /home/developer/certs/vtb-nuc
cat rootca_ssl_rsa2022.crt subca_ssl_rsa2022.crt subca_ssl_rsa2024.crt > vtb-nuc-chain.pem
grep -c "BEGIN CERTIFICATE" vtb-nuc-chain.pem
```

Ожидание: `3`.

Но пользователь сказал "та же ошибка" после проверки. Нужно продолжить диагностику.

## Следующие шаги для нового агента

1. Проверить, что chain реально 3 сертификата:
   ```bash
   cd /home/developer/certs/vtb-nuc
   grep -c "BEGIN CERTIFICATE" vtb-nuc-chain.pem
   ```

2. Проверить OpenSSL вручную:
   ```bash
   openssl s_client \
     -connect epa-ift-sbp.vtb.ru:443 \
     -servername epa-ift-sbp.vtb.ru \
     -CAfile /home/developer/certs/vtb-nuc/vtb-nuc-chain.pem \
     </dev/null
   ```
   Важна строка:
   ```txt
   Verify return code: ...
   ```

3. Проверить curl:
   ```bash
   curl --cacert /home/developer/certs/vtb-nuc/vtb-nuc-chain.pem -I https://epa-ift-sbp.vtb.ru:443/passport/oauth2/token
   ```

4. Проверить Node one-liner:
   ```bash
   NODE_EXTRA_CA_CERTS=/home/developer/certs/vtb-nuc/vtb-nuc-chain.pem node -e "console.log(process.env.NODE_EXTRA_CA_CERTS); fetch('https://epa-ift-sbp.vtb.ru:443/passport/oauth2/token').then(r => console.log('ok', r.status)).catch(e => console.error(e.cause || e))"
   ```
   Если TLS работает, должен быть не `unable to get local issuer certificate`. HTTP 400/405 допустим, потому что нет POST body.

5. Если one-liner работает, но PM2 нет — PM2 не подхватил env:
   - Добавить в `.env` или ecosystem:
     ```env
     NODE_EXTRA_CA_CERTS=/home/developer/certs/vtb-nuc/vtb-nuc-chain.pem
     ```
   - Перезапустить:
     ```bash
     pm2 restart indigo-shop --update-env
     ```
   - Если не поможет, удалить/создать процесс с env:
     ```bash
     pm2 delete indigo-shop
     NODE_EXTRA_CA_CERTS=/home/developer/certs/vtb-nuc/vtb-nuc-chain.pem pm2 start .output/server/index.mjs --name indigo-shop
     ```

6. Если OpenSSL/curl тоже не проходит — вероятно, не хватает другого промежуточного сертификата от реальной цепочки `epa-ift-sbp.vtb.ru`. Надо посмотреть chain из `openssl s_client -showcerts ...` и сопоставить Issuer/Subject.

## Временный небезопасный workaround

Для быстрой проверки тестовой оплаты можно поставить:

```env
NODE_TLS_REJECT_UNAUTHORIZED=0
```

и перезапустить PM2. Но это небезопасно, не оставлять на prod.

## Важный момент про X-IBM-Client-Id

ВТБ пишет: `X-IBM-Client-Id` должен быть `client_id` в нижнем регистре и **без домена** `@ext.vtb.ru`. В коде это реализовано в `server/utils/vtb-config.js`:

```js
replace(/@ext\.vtb\.ru$/i, '')
```

То есть из:

```txt
r252.apptw.10f9b6c5-eb8d-4ca4-b046-6933b0a7f844@ext.vtb.ru
```

в заголовок должно уйти:

```txt
r252.apptw.10f9b6c5-eb8d-4ca4-b046-6933b0a7f844
```

## Git status на момент создания контекста

Ожидаемо есть изменения по оплате. Перед передачей проверить:

```bash
git status --short
```

Особо обратить внимание, что удалены:

- `server/utils/vtb-payment.js`
- `server/api/payments/vtb-sbp/callback.get.js`

и добавлены:

- `server/api/payments/vtb-sbp/callback.post.js`
- `server/utils/vtb-config.js`
- `server/utils/vtb-http-client.js`
- `server/utils/vtb-payment-status-mapper.js`
- `server/utils/vtb-payment-status.js`
- `server/utils/vtb-sbp-api.js`
