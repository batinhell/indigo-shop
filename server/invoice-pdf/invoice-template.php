<?php

function h($value): string
{
    return htmlspecialchars((string)$value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function rub($value, int $decimals = 2): string
{
    return number_format((float)$value, $decimals, ',', ' ');
}

$company = is_array($company ?? null) ? $company : [];
$payer = is_array($payer ?? null) ? $payer : [];
$items = is_array($items ?? null) ? $items : [];
$total = (float)($total ?? 0);
$invoice_number = (string)($invoice_number ?? '');
$invoice_date = (string)($invoice_date ?? '');
$vat_text = (string)($vat_text ?? 'Без НДС');
$total_words = (string)($total_words ?? '');
$logo_base64 = (string)($logo_base64 ?? '');
$director_name = (string)($director_name ?? ($company['director_name'] ?? $company['name'] ?? ''));
?><!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<title>Счёт <?= h($invoice_number) ?></title>
<style>
    @page { margin: 12mm 16mm 16mm 16mm; }
    body {
        font-family: manrope, sans-serif;
        font-size: 9.5pt;
        color: #1a1a1a;
        line-height: 1.35;
    }
    .page { position: relative; }
    .top-bar {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 2mm;
    }
    .top-bar td { vertical-align: top; }
    .top-logo-cell { width: 33mm; }
    .invoice-logo { width: 28mm; }
    .top-company {
        font-weight: 700;
        font-size: 11pt;
        padding-top: 1mm;
    }
    .top-role {
        font-size: 7.5pt;
        color: #888;
    }
    .top-amount {
        width: 62mm;
        text-align: right;
    }
    .top-sum {
        font-weight: 700;
        font-size: 13pt;
        white-space: nowrap;
    }
    .top-vat {
        font-size: 7.5pt;
        color: #888;
    }
    .bank-tbl {
        width: 100%;
        border-collapse: collapse;
        border: 1.5pt solid #1a1a1a;
        margin: 2mm 0 1.5mm 0;
    }
    .bank-tbl td {
        padding: 1.5mm 2.5mm;
        font-size: 9pt;
        vertical-align: top;
    }
    .bank-tbl .cell-left {
        width: 54%;
        border-right: 1pt solid #999;
    }
    .bank-tbl .cell-right { width: 46%; }
    .bank-tbl .row-border td { border-bottom: 1pt solid #999; }
    .bank-tbl .lbl {
        display: block;
        font-size: 7pt;
        color: #888;
    }
    .bank-tbl .val { font-size: 9pt; }
    .bank-tbl .val-bold {
        font-weight: 700;
        font-size: 9.5pt;
    }
    .bank-tbl .val-right {
        text-align: right;
        font-variant-numeric: tabular-nums;
    }
    .receiver-box {
        border-bottom: 1.5pt solid #1a1a1a;
        padding: 1.5mm 2.5mm 1mm 2.5mm;
    }
    .receiver-box .name {
        font-weight: 700;
        font-size: 9.5pt;
    }
    .receiver-box .lbl {
        font-size: 7pt;
        color: #888;
    }
    .inv-title {
        font-weight: 700;
        font-size: 19pt;
        margin: 7mm 0 5mm 0;
    }
    .parties {
        font-size: 8.5pt;
        line-height: 1.5;
        margin-bottom: 4mm;
    }
    .party { margin-bottom: 2.5mm; }
    .items-tbl {
        width: 100%;
        border-collapse: collapse;
        margin: 3mm 0 2mm 0;
    }
    .items-tbl th {
        background: #f5f5f5;
        font-weight: 700;
        font-size: 7.5pt;
        padding: 2mm 2.5mm;
        text-align: left;
        border: 1pt solid #ccc;
        white-space: nowrap;
    }
    .items-tbl th.c { text-align: center; }
    .items-tbl th.r { text-align: right; }
    .items-tbl td {
        padding: 2mm 2.5mm;
        font-size: 9pt;
        border: 1pt solid #ccc;
        vertical-align: top;
    }
    .items-tbl td.c { text-align: center; }
    .items-tbl td.r {
        text-align: right;
        font-variant-numeric: tabular-nums;
    }
    .items-tbl .col-n { width: 7mm; }
    .items-tbl .col-qty { width: 14mm; }
    .items-tbl .col-unit { width: 14mm; }
    .items-tbl .col-price { width: 26mm; }
    .items-tbl .col-vat { width: 20mm; }
    .items-tbl .col-total { width: 26mm; }
    .totals {
        width: 100%;
        border-collapse: collapse;
        margin: 2mm 0 0 0;
    }
    .totals td { vertical-align: top; }
    .totals-left {
        width: 58%;
        font-size: 8.5pt;
        color: #444;
    }
    .totals-right {
        width: 42%;
        text-align: right;
    }
    .totals-right .label {
        font-size: 8pt;
        color: #888;
    }
    .totals-right .sum {
        font-weight: 700;
        font-size: 16pt;
        margin: 0.5mm 0;
    }
    .totals-right .vat {
        font-size: 8pt;
        color: #888;
    }
    .sigs {
        width: 100%;
        border-collapse: collapse;
        margin-top: 14mm;
    }
    .sigs td {
        vertical-align: top;
    }
    .sig-left { width: 47%; }
    .sig-gap { width: 6%; }
    .sig-right { width: 47%; }
    .sig-role {
        font-size: 7pt;
        color: #888;
    }
    .sig-space td { height: 20mm; }
    .sig-line .sig-left,
    .sig-line .sig-right {
        border-bottom: 1pt solid #1a1a1a;
        height: 0;
        line-height: 0;
        padding: 0;
    }
    .sig-line .sig-gap {
        border-bottom: 0;
        height: 0;
        line-height: 0;
        padding: 0;
    }
    .sig-title td {
        padding-top: 1.5mm;
        font-size: 8pt;
        color: #888;
    }
    .sig-name td {
        font-weight: 700;
        font-size: 9pt;
    }
</style>
</head>
<body>
<div class="page">

<table class="top-bar">
    <tr>
        <td class="top-logo-cell">
            <?php if ($logo_base64 !== ''): ?>
                <img class="invoice-logo" src="<?= h($logo_base64) ?>" alt="Индиго">
            <?php endif; ?>
        </td>
        <td>
            <div class="top-company"><?= h($company['name'] ?? '') ?></div>
            <div class="top-role">Получатель</div>
        </td>
        <td class="top-amount">
            <div class="top-sum"><?= rub($total) ?> ₽</div>
            <div class="top-vat"><?= h($vat_text) ?></div>
        </td>
    </tr>
</table>

<table class="bank-tbl">
    <tr class="row-border">
        <td class="cell-left" rowspan="2">
            <span class="val-bold"><?= h($company['bank_name'] ?? '') ?></span><br>
            <span class="lbl">Банк получателя</span>
        </td>
        <td class="cell-right">
            <span class="lbl">БИК</span>
            <div class="val val-right"><?= h($company['bik'] ?? '') ?></div>
        </td>
    </tr>
    <tr class="row-border">
        <td class="cell-right">
            <span class="lbl">Кор. Счёт</span>
            <div class="val val-right"><?= h($company['corr_account'] ?? '') ?></div>
        </td>
    </tr>
    <tr>
        <td class="cell-left">
            <span class="lbl">ИНН</span> <span class="val"><?= h($company['inn'] ?? '') ?></span>
        </td>
        <td class="cell-right">
            <span class="lbl">Счёт</span>
            <div class="val val-right"><?= h($company['account'] ?? '') ?></div>
        </td>
    </tr>
</table>

<div class="receiver-box">
    <div class="name"><?= h($company['name'] ?? '') ?></div>
    <div class="lbl">Получатель</div>
</div>

<div class="inv-title">Счёт №<?= h($invoice_number) ?> от <?= h($invoice_date) ?></div>

<div class="parties">
    <div class="party">
        <b>Получатель:</b>&emsp;<?= h($company['name'] ?? '') ?>, ИНН <?= h($company['inn'] ?? '') ?>, <?= h($company['address'] ?? '') ?>, р/с <?= h($company['account'] ?? '') ?>, в банке <?= h($company['bank_name'] ?? '') ?>, БИК <?= h($company['bik'] ?? '') ?>, к/с <?= h($company['corr_account'] ?? '') ?>
    </div>
    <div class="party">
        <b>Плательщик:</b>&emsp;<?= h($payer['name'] ?? '') ?>, ИНН/КПП <?= h($payer['inn'] ?? '') ?>/<?= h($payer['kpp'] ?? '') ?>, <?= h($payer['address'] ?? '') ?>, р/с <?= h($payer['account'] ?? '—') ?>, в банке <?= h($payer['bank_name'] ?? '—') ?>, БИК <?= h($payer['bik'] ?? '—') ?>, к/с <?= h($payer['corr_account'] ?? '—') ?>
    </div>
</div>

<table class="items-tbl">
    <colgroup>
        <col class="col-n">
        <col class="col-name">
        <col class="col-qty">
        <col class="col-unit">
        <col class="col-price">
        <col class="col-vat">
        <col class="col-total">
    </colgroup>
    <thead>
        <tr>
            <th class="c">№</th>
            <th>Название товара или услуги</th>
            <th class="c">Кол-во</th>
            <th class="c">Ед. Изм.</th>
            <th class="r">Цена</th>
            <th class="c">НДС</th>
            <th class="r">Сумма</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach ($items as $i => $item): ?>
            <tr>
                <td class="c"><?= $i + 1 ?></td>
                <td><?= h($item['name'] ?? '') ?></td>
                <td class="c"><?= rub($item['qty'] ?? 0, 0) ?></td>
                <td class="c"><?= h($item['unit'] ?? 'шт.') ?></td>
                <td class="r"><?= rub($item['price'] ?? 0) ?> ₽</td>
                <td class="c"><?= h($vat_text) ?></td>
                <td class="r"><?= rub($item['total'] ?? 0) ?> ₽</td>
            </tr>
        <?php endforeach; ?>
    </tbody>
</table>

<table class="totals">
    <tr>
        <td class="totals-left">
            Всего <?= count($items) ?> наименований на сумму <?= h($total_words) ?>.
        </td>
        <td class="totals-right">
            <div class="label">Итог к оплате:</div>
            <div class="sum"><?= rub($total) ?> ₽</div>
            <div class="vat"><?= h($vat_text) ?></div>
        </td>
    </tr>
</table>

<table class="sigs">
    <tr>
        <td class="sig-role sig-left">Получатель:</td>
        <td class="sig-gap"></td>
        <td class="sig-role sig-right">Плательщик:</td>
    </tr>
    <tr class="sig-space">
        <td class="sig-left"></td>
        <td class="sig-gap"></td>
        <td class="sig-right"></td>
    </tr>
    <tr class="sig-line">
        <td class="sig-left"></td>
        <td class="sig-gap"></td>
        <td class="sig-right"></td>
    </tr>
    <tr class="sig-title">
        <td class="sig-left"><?= h($company['short_name'] ?? 'Получатель') ?></td>
        <td class="sig-gap"></td>
        <td class="sig-right">Плательщик</td>
    </tr>
    <tr class="sig-name">
        <td class="sig-left"><?= h($director_name) ?></td>
        <td class="sig-gap"></td>
        <td class="sig-right"><?= h($payer['name'] ?? '') ?></td>
    </tr>
</table>

</div>
</body>
</html>
