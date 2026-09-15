"""Measure production WebPs; requires Python 3 and Pillow with WebP support."""

import argparse
import hashlib
import json
from pathlib import Path
import re

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "src/lib/design-system/artwork-measurements.json"
ALPHA_THRESHOLD = 16


def measure(path, brightness):
    with Image.open(path) as source:
        image = source.convert("RGBA")
    width, height = image.size
    bounds = image.getchannel("A").point(
        lambda alpha: 255 if alpha > ALPHA_THRESHOLD else 0
    ).getbbox()
    if bounds is None:
        raise ValueError(f"No visible subject in {path.name}")
    mass = moment_x = moment_y = 0.0
    # CSS grayscale(1) uses these sRGB coefficients. Brightness follows grayscale;
    # alpha compositing on white gives contrast = alpha * (1 - filtered gray).
    pixels = iter(image.tobytes())
    for index, (red, green, blue, alpha) in enumerate(zip(pixels, pixels, pixels, pixels)):
        if alpha <= ALPHA_THRESHOLD:
            continue
        gray = (0.2126 * red + 0.7152 * green + 0.0722 * blue) / 255
        weight = alpha / 255 * (1 - brightness * gray)
        mass += weight
        moment_x += weight * (index % width + 0.5)
        moment_y += weight * (index // width + 0.5)
    if mass <= 0:
        raise ValueError(f"No measurable contrast in {path.name}")
    x, y, right, bottom = bounds
    return {
        "source": [width, height],
        "bounds": [x, y, right - x, bottom - y],
        "mass": mass,
        "center": [moment_x / mass, moment_y / mass],
        "sha256": hashlib.sha256(path.read_bytes()).hexdigest(),
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="Fail if measurements are stale")
    args = parser.parse_args()
    tokens = {
        item["id"]: item["value"]
        for item in json.loads((ROOT / "src/lib/design-system/tokens.json").read_text())
    }
    # Fail explicitly if the approved rendering model changes, rather than silently
    # measuring a different filter, background, unit or frame expression.
    assert tokens["color-paper"] == "#fff", "Measurement assumes a white page"
    filter_match = re.fullmatch(r"grayscale\(1\) brightness\((0?\.\d+)\)", tokens["artwork-filter"])
    frame_match = re.fullmatch(r"calc\((\d+)rem \* (\d+) / (\d+)\)", tokens["size-artwork"])
    inset_match = re.fullmatch(r"(\d+)rem", tokens["space-16"])
    assert filter_match and frame_match and inset_match, "Update the measurement model for changed tokens"
    brightness = float(filter_match[1])
    height_rem, ratio_width, ratio_height = map(int, frame_match.groups())
    assert tokens["artwork-ratio"] == f"{ratio_width} / {ratio_height}"
    data = {
        "model": {
            "alphaThreshold": ALPHA_THRESHOLD,
            "filter": tokens["artwork-filter"],
            "background": tokens["color-paper"],
            "ratio": [ratio_width, ratio_height],
            "frameHeightRem": height_rem,
            "insetRem": int(inset_match[1]),
        },
        "assets": {
            path.stem: measure(path, brightness)
            for path in sorted((ROOT / "static/images/artwork").glob("*.webp"))
        },
    }
    if args.check:
        if json.loads(OUTPUT.read_text()) != data:
            raise SystemExit("Artwork measurements are stale; run bun run artwork:measure")
        print("Artwork measurements match the production files and rendering tokens.")
    else:
        OUTPUT.write_text(json.dumps(data, indent=4) + "\n")
        print(f"Measured {len(data['assets'])} production illustrations: {OUTPUT}")


if __name__ == "__main__":
    main()
