/** Measured alpha bounds in the original Figma exports; asset data, not layout guesses. */
export const artworkGeometry = {
    sourceSize: 1200,
    ratioWidth: 1103,
    ratioHeight: 939,
    bounds: {
        lantern: [330, 33, 450, 1123],
        identity: [345, 27, 400, 1139],
        roots: [166, 67, 866, 1081],
        community: [56, 123, 1103, 939],
        agents: [362, 43, 509, 1117],
        open: [113, 127, 990, 723],
    },
} as const;
export type ArtworkName = keyof typeof artworkGeometry.bounds;

export function artworkViewBox(name: ArtworkName) {
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
