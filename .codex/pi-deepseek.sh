#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

if [[ -z "${FIREWORKS_API_KEY:-}" && -f ".env" ]]; then
  set -a
  # shellcheck disable=SC1091
  source ".env"
  set +a
fi

if [[ -z "${FIREWORKS_API_KEY:-}" ]]; then
  echo "FIREWORKS_API_KEY is not set. Add it to Codex Environment or project .env." >&2
  exit 1
fi

MODEL="${PI_DEEPSEEK_MODEL:-accounts/fireworks/models/deepseek-v4-pro}"

exec pi \
  --provider fireworks \
  --model "$MODEL" \
  --thinking off \
  --tools read,grep,find,ls,edit,write \
  --no-session \
  "$@"
