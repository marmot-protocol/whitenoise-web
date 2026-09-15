import measurements from "./artwork-measurements.json";

export type ArtworkName = keyof typeof measurements.assets;
export type ArtworkNormalization = "bounds" | "visual-mass";
const names = Object.keys(measurements.assets) as ArtworkName[];

/** Generated source geometry; no image analysis or catalog imports in the browser. */
export const artworkGeometry = {
    ratioWidth: measurements.model.ratio[0],
    ratioHeight: measurements.model.ratio[1],
    sources: Object.fromEntries(
        names.map((name) => [name, measurements.assets[name].source])
    ) as Record<ArtworkName, [number, number]>,
    bounds: Object.fromEntries(
        names.map((name) => [name, measurements.assets[name].bounds])
    ) as Record<ArtworkName, [number, number, number, number]>,
};

// All calculations use rem-sized reference units. The SVG scales the resulting
// geometry uniformly, including the existing 1rem inset, at every breakpoint.
const height = measurements.model.frameHeightRem;
const width = (height * artworkGeometry.ratioWidth) / artworkGeometry.ratioHeight;
const inset = measurements.model.insetRem;
const referenceBounds = measurements.assets.conversation.bounds;
const referenceScale = Math.min(width / referenceBounds[2], height / referenceBounds[3]);
const ceiling = measurements.assets.conversation.mass * referenceScale ** 2;

function safeScale(name: ArtworkName) {
    const {
        bounds: [x, y, w, h],
        center: [cx, cy],
    } = measurements.assets[name];
    return Math.min(
        (width / 2 - inset) / Math.max(cx - x, x + w - cx),
        (height / 2 - inset) / Math.max(cy - y, y + h - cy)
    );
}

/** One feasible target for the whole set, never individual fit corrections. */
export const artworkBalance = {
    width,
    height,
    inset,
    ceiling,
    target: Math.min(
        ceiling,
        ...names.map((name) => measurements.assets[name].mass * safeScale(name) ** 2)
    ),
};

export function artworkPlacement(name: ArtworkName) {
    const { mass, center } = measurements.assets[name];
    const scale = Math.sqrt(artworkBalance.target / mass);
    return {
        scale,
        x: width / 2 - center[0] * scale,
        y: height / 2 - center[1] * scale,
    };
}

/** User-reviewed optical corrections, applied after the measured baseline. */
export const artworkOpticalAdjustments: Partial<
    Record<ArtworkName, { scale: number; offsetX: number; compactOffsetX?: number }>
> = {
    "children-plant": { scale: 1.05, offsetX: 0 },
    "identity-balloon": { scale: 1.05 * 1.025, offsetX: 0 },
    "smith-chain": { scale: 1, offsetX: -0.05, compactOffsetX: -0.1 },
};

/** Extra shift relative to the desktop viewBox, in normalized frame widths. */
export function artworkCompactOffset(name: ArtworkName) {
    const adjustment = artworkOpticalAdjustments[name];
    return adjustment ? (adjustment.compactOffsetX ?? adjustment.offsetX) - adjustment.offsetX : 0;
}

export function artworkAdjustedPlacement(name: ArtworkName) {
    const baseline = artworkPlacement(name);
    const adjustment = artworkOpticalAdjustments[name] ?? { scale: 1, offsetX: 0 };
    const [cx, cy] = measurements.assets[name].center;
    const scale = baseline.scale * adjustment.scale;
    return {
        scale,
        x: width * (0.5 + adjustment.offsetX) - cx * scale,
        y: height / 2 - cy * scale,
    };
}

export function artworkSourceSize(name: ArtworkName): readonly [number, number] {
    return artworkGeometry.sources[name];
}

export function artworkViewBox(name: ArtworkName, normalization: ArtworkNormalization = "bounds") {
    if (normalization === "visual-mass") {
        const { scale, x, y } = artworkAdjustedPlacement(name);
        return [
            -x / scale,
            -y / scale,
            artworkBalance.width / scale,
            artworkBalance.height / scale,
        ];
    }
    const [x, y, width, height] = artworkGeometry.bounds[name];
    const ratio = artworkGeometry.ratioWidth / artworkGeometry.ratioHeight;
    const viewportHeight = Math.max(height, width / ratio);
    const viewportWidth = viewportHeight * ratio;
    return [
        x - (viewportWidth - width) / 2,
        y - (viewportHeight - height) / 2,
        viewportWidth,
        viewportHeight,
    ];
}
