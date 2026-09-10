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
    },
} as const;
export type ArtworkName = keyof typeof artworkGeometry.bounds;
