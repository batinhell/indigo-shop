# Indigo Shop

Nuxt application for the Indigo online shop: catalog, cart checkout, customer profile orders, SBP payments, and legal-entity invoice payments.

## Setup

Install Node dependencies:

```bash
npm install
```

Install PHP invoice-renderer dependencies:

```bash
composer install
```

The invoice PDF renderer uses PHP/mPDF from `server/invoice-pdf`. Production/runtime environment must provide:

- PHP CLI available as `php` or `PHP_BINARY`
- Composer dependencies installed in `vendor/`
- PHP extensions required by mPDF and the renderer, including `intl`, `mbstring`, and GD-compatible image support
- writable `storage/` directory

Runtime-generated files under `storage/app/` and `storage/invoices/` are intentionally ignored by git.

## Scripts

```bash
npm run lint
npm run build
npm run dev
```
