#!/usr/bin/env python3
# Серверный композер превью флага (Конструктор v2, Фаза C).
# Берёт макет юзера + запечённые слои геометрии → собирает бесшовный MP4-луп.
# Ткань — рантайм-параметр (тон/насыщенность/блик/плетение), геометрия складок общая
# на все ткани, поэтому тяжёлые слои пекутся раз на 4 геометрии (крепление × бахрома).
#
#   python3 compose_service.py \
#       --layers <dir> --variant grommets_fringe --fabric atlas \
#       --design <design.png> --out <out.mp4> \
#       [--frames 16] [--fps 20] [--work-size 640] [--size 0] [--mirror]
#
# Слои (Blender PASS=uv / PASS=look), общие для всех тканей данной геометрии:
#   pass_u, pass_v  — 16-бит grayscale, UV (карта варпа макета и плетения)
#   pass_mask       — маска ткани (8-бит)
#   pass_diff       — 16-бит, свет матовой белой ткани (складки+тень) → множитель albedo
#   pass_spec       — 16-бит, мягкий блик/sheen геометрии → добавка × блеск ткани
#   pass_full       — RGB, плашка (фон+бахрома+крепление) для пикселей вне ткани
# Имена кадров: pass_<name>_<variant>_f<NN>.png (NN = 00..frames-1).
#
# Зависимости стенда (ставятся через apt): python3, python3-pil (PIL 9.x),
# python3-numpy, ffmpeg. ВАЖНО: в PIL 9.x 16-битный grayscale открывается как mode
# "I;16" — нормируем по mode, а не по numpy-dtype (иначе делёж на 255 вместо 65535).
import argparse
import math
import os
import subprocess
import sys
import tempfile

import numpy as np
from PIL import Image, ImageFilter

# Ткань как параметры (зеркало FABRICS из flag_all.py): sat — печатная насыщенность,
# sheen — множитель блика, tint — лёгкий тон, weave — направление/частота/сила нитей.
FABRICS = {
    "atlas":      dict(sat=1.14, sheen=0.85, tint=(1.00, 1.00, 1.00),   wdir="Y",    wscale=230, wstr=0.07),
    "dome_atlas": dict(sat=1.12, sheen=1.20, tint=(1.00, 1.00, 1.02),   wdir="Y",    wscale=230, wstr=0.04),
    "nylon":      dict(sat=1.12, sheen=0.40, tint=(1.00, 1.00, 1.00),   wdir="GRID", wscale=170, wstr=0.18),
    "gabardine":  dict(sat=1.10, sheen=0.08, tint=(0.985, 0.99, 0.995), wdir="DIAG", wscale=120, wstr=0.55),
    "mesh":       dict(sat=1.10, sheen=0.08, tint=(1.00, 1.00, 1.00),   wdir="GRID", wscale=85,  wstr=0.50),
}

_I16_MODES = ("I", "I;16", "I;16B", "I;16L", "I;16N")


def g16(path):
    """Читает одноканальный слой в float 0..1. Нормировка по PIL-mode (устойчиво к PIL 9.x)."""
    im = Image.open(path)
    mode = im.mode
    a = np.asarray(im)
    if a.ndim == 3:
        a = a[..., 0]
    a = a.astype(np.float32)
    if mode in _I16_MODES:
        return a / 65535.0
    if mode == "F":
        return a
    return a / 255.0


def srgb_to_lin(x):
    return np.where(x <= 0.04045, x / 12.92, ((x + 0.055) / 1.055) ** 2.4)


def lin_to_srgb(x):
    x = np.clip(x, 0.0, 1.0)
    return np.where(x <= 0.0031308, x * 12.92, 1.055 * x ** (1 / 2.4) - 0.055)


def saturate(rgb, s):
    """насыщенность в sRGB (rec709 luma)"""
    lum = (rgb * np.array([0.2126, 0.7152, 0.0722], np.float32)).sum(-1, keepdims=True)
    return np.clip(lum + (rgb - lum) * s, 0.0, 1.0)


def weave_pattern(u, v, fab):
    """фактура нитей по UV (следует за складками). Возвращает 0..1, где 1 — нить."""
    f = fab["wscale"] * 0.06
    d = fab["wdir"]
    if d == "Y":
        p = 0.5 + 0.5 * np.sin(u * f * 2 * math.pi)
    elif d == "X":
        p = 0.5 + 0.5 * np.sin(v * f * 2 * math.pi)
    elif d == "DIAG":
        p = 0.5 + 0.5 * np.sin((u + v) * f * math.pi)
    else:  # GRID
        p = (0.5 + 0.5 * np.sin(u * f * 2 * math.pi)) * (0.5 + 0.5 * np.sin(v * f * 2 * math.pi))
    return p.astype(np.float32)


class LayerCache:
    """Кэш запечённых слоёв в памяти процесса (одни и те же u/v/diff/... на все кадры по разу).

    work_size — рабочее разрешение композита (даунскейл слоёв при загрузке). Складки
    и UV гладкие, поэтому билинейный даунскейл не портит лук, а компонование и запись
    кадров ускоряются ~квадратично. None = нативное разрешение слоёв.
    """

    def __init__(self, layers_dir, work_size=None):
        self.dir = layers_dir
        self.work_size = work_size
        self._c = {}

    def path(self, name, variant, frame):
        suf = ("_f%02d" % frame) if frame is not None else ""
        return os.path.join(self.dir, "pass_%s_%s%s.png" % (name, variant, suf))

    def _rs_img(self, im, resample):
        if self.work_size and im.size[0] != self.work_size:
            return im.resize((self.work_size, self.work_size), resample)
        return im

    def _rs_arr(self, arr):
        """Даунскейл float-массива через PIL mode 'F' (16-битные слои resize-ятся как float)."""
        if self.work_size and arr.shape[0] != self.work_size:
            im = Image.fromarray(arr, mode="F").resize((self.work_size, self.work_size), Image.BILINEAR)
            return np.asarray(im, dtype=np.float32)
        return arr

    def get(self, name, variant, frame):
        key = (name, variant, frame)
        if key not in self._c:
            p = self.path(name, variant, frame)
            if name in ("u", "v", "diff", "spec"):
                self._c[key] = self._rs_arr(g16(p))
            elif name == "mask":
                m = self._rs_img(Image.open(p).convert("L"), Image.BILINEAR).filter(ImageFilter.GaussianBlur(1.0))
                self._c[key] = (np.asarray(m).astype(np.float32) / 255.0)[..., None]
            else:  # full
                self._c[key] = np.asarray(self._rs_img(Image.open(p).convert("RGB"), Image.BILINEAR)).astype(np.float32) / 255.0
        return self._c[key]


def compose_frame(cache, variant, fab, design, frame):
    u = cache.get("u", variant, frame)
    v = cache.get("v", variant, frame)
    diff = cache.get("diff", variant, frame)
    spec = cache.get("spec", variant, frame)
    full = cache.get("full", variant, frame)
    mask_f = cache.get("mask", variant, frame)
    dh, dw = design.shape[:2]

    # варп макета по (u, 1-v)
    sx = np.clip((u * (dw - 1)).astype(np.int32), 0, dw - 1)
    sy = np.clip(((1.0 - v) * (dh - 1)).astype(np.int32), 0, dh - 1)
    warped = saturate(design[sy, sx], fab["sat"])

    # плетение (по UV → драпируется вместе с тканью)
    wv = weave_pattern(u, v, fab)
    weave_mult = (1.0 - fab["wstr"] * 0.10 * (1.0 - wv))[..., None]
    spec_mod = spec * (0.9 + 0.2 * wv)

    # сборка в линейном свете: albedo×свет + блик, затем плетение и тон
    diff_lin = srgb_to_lin(diff)[..., None]
    cloth = srgb_to_lin(warped) * (diff_lin / srgb_to_lin(np.float32(0.95)))
    cloth = cloth * weave_mult
    cloth = cloth + srgb_to_lin(spec_mod)[..., None] * fab["sheen"]
    cloth = cloth * np.array(fab["tint"], np.float32)
    cloth = lin_to_srgb(cloth)

    out = full * (1.0 - mask_f) + cloth * mask_f
    return Image.fromarray((np.clip(out, 0, 1) * 255).astype(np.uint8))


def build_mp4(layers_dir, variant, fabric, design_path, out_mp4,
              frames=16, fps=20, size=None, work_size=None, mirror=False, ffmpeg="ffmpeg"):
    fab = FABRICS[fabric]
    cache = LayerCache(layers_dir, work_size=work_size)
    design = np.asarray(Image.open(design_path).convert("RGB")).astype(np.float32) / 255.0

    tmp = tempfile.mkdtemp(prefix="flagc_")
    try:
        for f in range(frames):
            im = compose_frame(cache, variant, fab, design, f)
            if mirror:
                im = im.transpose(Image.FLIP_LEFT_RIGHT)
            if size:
                im = im.resize((size, size), Image.LANCZOS)
            im.save(os.path.join(tmp, "f_%03d.png" % f))

        os.makedirs(os.path.dirname(os.path.abspath(out_mp4)), exist_ok=True)
        cmd = [
            ffmpeg, "-y", "-loglevel", "error",
            "-framerate", str(fps),
            "-i", os.path.join(tmp, "f_%03d.png"),
            "-c:v", "libx264", "-pix_fmt", "yuv420p",
            "-crf", "20", "-preset", "veryfast",
            "-movflags", "+faststart", "-an",
            out_mp4,
        ]
        subprocess.run(cmd, check=True)
    finally:
        for n in os.listdir(tmp):
            try:
                os.remove(os.path.join(tmp, n))
            except OSError:
                pass
        os.rmdir(tmp)


def main(argv):
    ap = argparse.ArgumentParser()
    ap.add_argument("--layers", required=True)
    ap.add_argument("--variant", required=True)
    ap.add_argument("--fabric", required=True)
    ap.add_argument("--design", required=True)
    ap.add_argument("--out", required=True)
    ap.add_argument("--frames", type=int, default=16)
    ap.add_argument("--fps", type=int, default=20)
    ap.add_argument("--size", type=int, default=0)
    ap.add_argument("--work-size", type=int, default=0, dest="work_size")
    ap.add_argument("--mirror", action="store_true")
    ap.add_argument("--ffmpeg", default=os.environ.get("FFMPEG_BINARY", "ffmpeg"))
    a = ap.parse_args(argv)

    if a.fabric not in FABRICS:
        print("unknown fabric: %s" % a.fabric, file=sys.stderr)
        return 2

    build_mp4(a.layers, a.variant, a.fabric, a.design, a.out,
              frames=a.frames, fps=a.fps, size=(a.size or None),
              work_size=(a.work_size or None), mirror=a.mirror, ffmpeg=a.ffmpeg)
    print("OK %s" % a.out)
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
