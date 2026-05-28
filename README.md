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

## Production PM2 Environment

If production is running under PM2 without an `ecosystem.config.js`, PM2 does not read `.env` automatically on restart. Load the file into the current shell first, then restart with `--update-env`:

```bash
cd /path/to/indigo-shop

set -a
. ./.env
set +a

pm2 restart <app-id-or-name> --update-env
pm2 save
```

Verify that PM2 sees the variables:

```bash
pm2 env <app-id> | grep -E 'NOTIFICORE|NUXT_NOTIFICORE'
```

Run these commands as the same user that owns the PM2 process.
