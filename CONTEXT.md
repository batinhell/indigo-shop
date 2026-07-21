# Indigo Shop

Контекст интернет-магазина Indigo: оформление заказов с сайта, выбор плательщика и получение оплаты.

## Language

**Site Order**:
Заказ, оформленный покупателем на сайте и сохранённый с публичным номером для дальнейшей оплаты и отслеживания.
_Avoid_: Order без уточнения, transaction

**Invoice Payment**:
Безналичный сценарий оплаты для юрлица, при котором для существующего **Site Order** формируется PDF-счёт, а сам заказ ожидает поступления оплаты.
_Avoid_: Оплата по QR, СБП, online payment

**Invoice Delivery**:
Передача сформированного PDF-счёта покупателю через модальное окно на сайте и письмо на email из контактных данных заказа.
_Avoid_: Только автоскачивание, только новая вкладка, email аккаунта как единственный источник

**Invoice Number**:
Брендированный номер счёта в формате `IND-YYYY-00001`, присваиваемый отдельно от номера заказа с годовой последовательностью на дату создания счёта.
_Avoid_: Site Order id как номер счёта, СЧ, generic INV

**Invoice Artifact**:
Сохранённый приватный PDF-файл счёта, который повторно отдают покупателю или менеджеру через контролируемый доступ без пересборки документа.
_Avoid_: Regenerated invoice PDF, public invoice URL

**Seller Details**:
Реквизиты продавца Indigo, используемые в счёте и версионируемые вместе с генератором счёта.
_Avoid_: Secret env value, customer details

**Payer Details**:
Реквизиты организации-плательщика в счёте: название, ИНН, КПП при наличии и адрес без банковских реквизитов плательщика.
_Avoid_: Empty payer bank fields, DaData bank account assumptions

**Invoice Line**:
Строка счёта, соответствующая товарной позиции корзины; если у позиции есть стоимость дизайна, она добавляется отдельной строкой «Разработка дизайн-макета».
_Avoid_: Unit price that does not multiply to line total, single aggregated order line

**VAT Treatment**:
Налоговая пометка счёта: «Без НДС» для счёта и каждой строки.
_Avoid_: VAT 20% unless seller details change

**Payment Attempt**:
Одна отдельная попытка оплатить **Site Order** через СБП или банковскую карту с собственным идентификатором заказа ВТБ и статусом. СБП-попытка содержит QR и срок его действия; карточная попытка перенаправляет покупателя на `payUrl` платёжной формы ВТБ.
_Avoid_: Site Order как идентификатор платежа, перезапись предыдущей попытки

**Refund**:
Инициированный только менеджером возврат подтверждённой **Payment Attempt** после рассмотрения заявления покупателя по email. Полный возврат включает весь состав заказа; частичный задаётся выбранными позициями и количеством, а сумму рассчитывает сервер.
_Avoid_: публичный browser refund, автоматический возврат при отмене, произвольная сумма возврата, доверенная сумма из CRM или браузера

**Fiscal Receipt**:
Отдельный чек продажи или возврата со снимком позиций и собственным идентификатором документа Rarus.
_Avoid_: один набор fiscal-полей на Site Order для всех операций

**Payment Job**:
Сохраняемая в БД идемпотентная задача синхронизации платежа, возврата или **Fiscal Receipt**, которую можно продолжить после рестарта процесса.
_Avoid_: setTimeout как единственный механизм доставки

## Relationships

- A **Site Order** receives its public order number in the existing `SITE-{orderId}-{suffix}` format when it is created, before a payment method starts.
- A **Site Order** may be paid through **Invoice Payment** when the payer is a legal entity.
- A **Site Order** may have multiple **Payment Attempts** for СБП and card payments, but at most one active attempt for the selected method is reused until it becomes terminal or expires.
- A card **Payment Attempt** creates a VTB order without `returnPaymentData` and redirects the customer to the returned `payUrl`.
- A **Payment Attempt** belongs to exactly one **Site Order** and has its own bank order id; the public Site Order number is never reused as a new bank attempt id.
- Public payment status access requires ownership of the related **Site Order** through the user session or order access token and returns an explicit safe DTO.
- A confirmed **Payment Attempt** updates the aggregate payment status on its **Site Order** and enqueues one sale **Fiscal Receipt**.
- A **Refund** belongs to the confirmed **Payment Attempt** being returned, not merely to the aggregate Site Order.
- Only a CRM manager may initiate a **Refund**; cancelling a Site Order does not automatically refund it.
- A partial **Refund** contains selected order lines and quantities rather than an arbitrary amount; the server calculates its amount and accounts for prior refunds.
- A completed full **Refund** moves the Site Order to «Возврат»; a completed partial **Refund** moves it to «Частичный возврат» and triggers customer email notification.
- A return **Fiscal Receipt** sends the refunded item snapshot and quantities to Rarus/OFD.
- A **Fiscal Receipt** belongs to a **Site Order** and optionally to one **Refund**; sale and return receipts are separate records.
- A **Payment Job** is claimed with a database lock, retried with backoff, and identified by a unique idempotency key.
- An **Invoice Payment** belongs to exactly one **Site Order**.
- An **Invoice Payment** has exactly one **Invoice Number**.
- A **Site Order** has at most one active **Invoice Payment**; repeated invoice start requests return the existing invoice instead of issuing a new number or resending email.
- An **Invoice Payment** produces exactly one **Invoice Artifact**.
- An **Invoice Payment** includes **Seller Details** at generation time.
- An **Invoice Payment** includes **Payer Details** at generation time.
- **Seller Details**, **Payer Details**, and invoice lines are snapshotted when the invoice is issued.
- An **Invoice Payment** contains one product **Invoice Line** per cart item and an additional design-service **Invoice Line** when that cart item has design cost.
- An **Invoice Payment** uses **VAT Treatment** at generation time.
- A customer may access an **Invoice Artifact** as the **Site Order** owner or with the order access token.
- A CRM manager may access an **Invoice Artifact** from the admin project for site orders they are allowed to view.
- The shop starts an **Invoice Payment** through `POST /api/payments/invoice/start` and returns invoice id, invoice number, date, amount, site order id/number, download URL, and email delivery flags.
- The **Invoice Artifact** is generated by the shop through the PHP/mPDF renderer in `server/invoice-pdf`, using a runtime HTML template and a short-lived Node orchestration layer.
- The **Invoice Artifact** uses locally bundled Manrope fonts so Cyrillic PDF text is stable across environments.
- The PHP/mPDF runtime requires `composer install`, writable `storage/`, and PHP extensions needed by mPDF and the renderer (`intl`, `mbstring`, GD-compatible image support).
- The **Invoice Artifact** may include a payment QR code generated by the PHP renderer.
- The **Invoice Artifact** does not show an expiration date in the first implementation.
- Invoice metadata is stored in the shared database so CRM can discover it without a webhook from the shop.
- The CRM obtains an **Invoice Artifact** through the shop API, not by reading the shop filesystem directly.
- CRM-to-shop invoice access uses the existing shared API token pattern with `SHOP_API_TOKEN` rather than customer session or order access token.
- CRM accesses invoice metadata and PDF by site order id through internal shop endpoints.
- Checkout cart is cleared after the **Invoice Artifact** is successfully created, even if email delivery fails.
- If email delivery fails after the **Invoice Artifact** is created, the customer still sees the invoice modal with a warning and a manual download action.
- The invoice modal says the invoice is formed and awaiting payment, shows expected funds arrival in 1–3 days, previews seller, payer, amount, provides a “Скачать счёт в PDF” action, and says the invoice is available in the personal account even though the profile download entry is planned for a later step.
- Invoice email contains invoice number, site order number, amount, a download link, and the PDF attachment when the email provider supports attachments.
- If email attachment delivery is unavailable, **Invoice Delivery** may fall back to an email with only the secure download link; this fallback still counts as successful email delivery.
- **Invoice Delivery** email status is tracked as `queued`, `sending`, `sent`, `failed`, or legacy `not_sent`; `queued`/`sending` must not be shown as a delivery failure.
- An **Invoice Payment** is generated before funds are received, so the **Site Order** remains unpaid with payment status `pending` and payment provider `invoice` until payment is confirmed.
- **Invoice Payment** does not change the **Site Order** production/workflow status.
- An **Invoice Payment** is delivered through **Invoice Delivery** after generation.
- **Invoice Delivery** uses the customer email entered during checkout.
- **Invoice Payment** requires a selected legal entity organization; without it, an invoice must not be generated.

## Example dialogue

> **Dev:** "Когда юрлицо нажимает «Оплатить по счету», мы просто показываем PDF без заказа?"
> **Domain expert:** "Нет, сначала создаём **Site Order**, затем формируем для него **Invoice Payment**, показываем модальное окно и отправляем счёт на email, чтобы заказ можно было отследить и сопоставить с поступившей оплатой."

## Flagged ambiguities

- "счёт" in UI means **Invoice Payment**, not the user profile account and not an online acquiring payment.
- "organization is always selected" applies only to legal-entity registration; checkout and profile flows can still produce a missing-organization state, so **Invoice Payment** validates it explicitly.
- Invoice modal may mention personal account availability before profile download UI exists; this is accepted temporary UX debt until profile invoice access is implemented.
