#!/usr/bin/env bash
# Разовая заливка запечённых слоёв превью флага (конструктор v2) на тестовый стенд.
#
# ЗАЧЕМ ОТДЕЛЬНО: слои — 109 МБ статичных PNG (u/v/diff/spec/mask/full × 16 кадров
# × 4 геометрии). В git их не держим, в CI-деплой (едет только .output) не кладём.
# Они меняются лишь при переносе бейка из Blender, поэтому ставятся на стенд руками.
#
# ИСТОЧНИК: директория с запечёнными слоями (out/ из Blender-бейка flag_all.py),
# где лежат файлы вида pass_<u|v|diff|spec|mask|full>_<variant>_f<NN>.png,
# variant ∈ {grommets, grommets_fringe, pocket, pocket_fringe}.
#
# USAGE:
#   ./scripts/ship-flag-layers.sh /path/to/blender/out
#
# Зависимости стенда (ставятся один раз): ffmpeg, python3-pil, python3-numpy
#   ssh developer@178.20.42.212 'sudo apt-get install -y ffmpeg python3-pil python3-numpy'
set -euo pipefail

SRC="${1:?укажи директорию с запечёнными слоями (out/)}"
SERVER="developer@178.20.42.212"
REMOTE="/var/www/ra-indigo-test/storage/flag-layers"

test -d "$SRC" || { echo "ERROR: нет директории $SRC" >&2; exit 1; }

echo ">> проверяю комплектность слоёв в $SRC ..."
for V in grommets grommets_fringe pocket pocket_fringe; do
  for P in u v diff spec mask full; do
    n=$(ls "$SRC"/pass_${P}_${V}_f[0-9][0-9].png 2>/dev/null | wc -l | tr -d ' ')
    if [ "$n" != "16" ]; then
      echo "ERROR: $V / pass_$P — найдено $n кадров (нужно 16)" >&2
      exit 1
    fi
  done
done
echo "   ок: 4 геометрии × 6 слоёв × 16 кадров"

echo ">> rsync слоёв на стенд ($REMOTE) ..."
ssh "$SERVER" "mkdir -p $REMOTE"
rsync -az --delete \
  --include='pass_*_grommets_f[0-9][0-9].png' \
  --include='pass_*_grommets_fringe_f[0-9][0-9].png' \
  --include='pass_*_pocket_f[0-9][0-9].png' \
  --include='pass_*_pocket_fringe_f[0-9][0-9].png' \
  --exclude='*' \
  "$SRC"/ "$SERVER:$REMOTE/"

echo ">> готово. На стенде: $(ssh "$SERVER" "ls $REMOTE | wc -l") файлов."
