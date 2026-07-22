#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENV_FILE="${ENV_FILE:-$PROJECT_DIR/.env}"
PROCESSOR_URL="${PAYMENT_JOBS_PROCESSOR_URL:-https://ra-indigo.com/api/internal/payment-jobs/process}"
BATCH_SIZE="${PAYMENT_JOBS_BATCH_SIZE:-10}"

if [[ ! -r "$ENV_FILE" ]]; then
  echo "Payment jobs processor: env file is not readable: $ENV_FILE" >&2
  exit 1
fi

SHOP_API_TOKEN="$(grep -m1 '^SHOP_API_TOKEN=' "$ENV_FILE" | cut -d= -f2- | tr -d '\r')"
SHOP_API_TOKEN="${SHOP_API_TOKEN%\"}"
SHOP_API_TOKEN="${SHOP_API_TOKEN#\"}"
SHOP_API_TOKEN="${SHOP_API_TOKEN%\'}"
SHOP_API_TOKEN="${SHOP_API_TOKEN#\'}"

if [[ -z "$SHOP_API_TOKEN" ]]; then
  echo "Payment jobs processor: SHOP_API_TOKEN is missing" >&2
  exit 1
fi

curl --silent --show-error --fail-with-body \
  --max-time 50 \
  --request POST "$PROCESSOR_URL" \
  --header "Authorization: Bearer $SHOP_API_TOKEN" \
  --header 'Content-Type: application/json' \
  --data "{\"limit\":$BATCH_SIZE}"
printf '\n'
