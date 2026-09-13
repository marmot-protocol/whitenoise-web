import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
    type ArtworkName,
    artworkAdjustedPlacement,
    artworkBalance,
    artworkCompactOffset,
    artworkPlacement,
    artworkViewBox,
} from "./artwork";
import measurements from "./artwork-measurements.json";
import { tokenById } from "./tokens";

const names = Object.keys(measurements.assets) as ArtworkName[];

describe("measured artwork normalization", () => {
    it("rejects stale source measurements or a changed rendering model", () => {
        for (const name of names) {
            const hash = createHash("sha256")
                .update(readFileSync(`static/images/artwork/${name}.webp`))
                .digest("hex");
            expect(hash).toBe(measurements.assets[name].sha256);
        }
        expect(measurements.model.filter).toBe(tokenById["artwork-filter"].value);
        expect(measurements.model.background).toBe(tokenById["color-paper"].value);
        expect(`${measurements.model.insetRem}rem`).toBe(tokenById["space-16"].value);
        const [w, h] = measurements.model.ratio;
        expect(`calc(${measurements.model.frameHeightRem}rem * ${w} / ${h})`).toBe(
            tokenById["size-artwork"].value
        );
    });

    it("uses the largest common safe mass below the talking-pair ceiling", () => {
        expect(artworkBalance.target).toBeGreaterThan(0);
        expect(artworkBalance.target).toBeLessThan(artworkBalance.ceiling);
        const margins: number[] = [];
        for (const name of names) {
            const {
                bounds: [x, y, w, h],
                mass,
            } = measurements.assets[name];
            const placement = artworkPlacement(name);
            expect(mass * placement.scale ** 2).toBeCloseTo(artworkBalance.target, 10);
            margins.push(
                x * placement.scale + placement.x,
                y * placement.scale + placement.y,
                artworkBalance.width - ((x + w) * placement.scale + placement.x),
                artworkBalance.height - ((y + h) * placement.scale + placement.y)
            );
        }
        expect(Math.min(...margins)).toBeCloseTo(artworkBalance.inset, 10);
    });

    it("keeps equal weight, optical centers and safe bounds at every responsive size", () => {
        for (const frameWidth of [artworkBalance.width * 16, 352, 342, 272]) {
            const frameHeight = (frameWidth * artworkBalance.height) / artworkBalance.width;
            const inset = (artworkBalance.inset * frameWidth) / artworkBalance.width;
            const expectedMass = artworkBalance.target * (frameWidth / artworkBalance.width) ** 2;
            for (const name of names) {
                const {
                    bounds: [x, y, w, h],
                    center: [cx, cy],
                    mass,
                } = measurements.assets[name];
                const baseline = artworkPlacement(name);
                const [left, top, width, height] = [
                    -baseline.x / baseline.scale,
                    -baseline.y / baseline.scale,
                    artworkBalance.width / baseline.scale,
                    artworkBalance.height / baseline.scale,
                ];
                const scale = frameWidth / width;
                expect(frameHeight / height).toBeCloseTo(scale, 10);
                expect((cx - left) * scale).toBeCloseTo(frameWidth / 2, 10);
                expect((cy - top) * scale).toBeCloseTo(frameHeight / 2, 10);
                expect((x - left) * scale).toBeGreaterThanOrEqual(inset - 1e-8);
                expect((y - top) * scale).toBeGreaterThanOrEqual(inset - 1e-8);
                expect((x + w - left) * scale).toBeLessThanOrEqual(frameWidth - inset + 1e-8);
                expect((y + h - top) * scale).toBeLessThanOrEqual(frameHeight - inset + 1e-8);
                expect(mass * scale ** 2).toBeCloseTo(expectedMass, 7);
            }
        }
    });

    it("applies the approved optical corrections without changing vertical centers or clipping subjects", () => {
        for (const name of names) {
            const baseline = artworkPlacement(name);
            const adjusted = artworkAdjustedPlacement(name);
            const factor =
                name === "identity-balloon" ? 1.05 * 1.025 : name === "children-plant" ? 1.05 : 1;
            const horizontalCenter = name === "smith-chain" ? 0.45 : 0.5;
            expect(adjusted.scale / baseline.scale).toBeCloseTo(factor, 10);
            const {
                center: [cx, cy],
                bounds: [x, y, w, h],
            } = measurements.assets[name];
            const [left, top, width, height] = artworkViewBox(name, "visual-mass");
            expect((cx - left) / width).toBeCloseTo(horizontalCenter, 10);
            expect((cy - top) / height).toBeCloseTo(0.5, 10);
            const compactShift = artworkCompactOffset(name);
            expect((cx - left) / width + compactShift).toBeCloseTo(
                name === "smith-chain" ? 0.4 : 0.5,
                10
            );
            expect((x - left) / width + compactShift).toBeGreaterThanOrEqual(0);
            expect((x + w - left) / width + compactShift).toBeLessThanOrEqual(1);
            expect(left).toBeLessThanOrEqual(x);
            expect(top).toBeLessThanOrEqual(y);
            expect(left + width).toBeGreaterThanOrEqual(x + w);
            expect(top + height).toBeGreaterThanOrEqual(y + h);
        }
    });

    it("reduces the dense group more than the slim pair while keeping bounds mode available", () => {
        const relativeScale = (name: ArtworkName) =>
            artworkViewBox(name)[2] / artworkViewBox(name, "visual-mass")[2];
        expect(relativeScale("children-plant")).toBeLessThan(relativeScale("conversation"));
        expect(relativeScale("conversation")).toBeLessThanOrEqual(1);
        for (const name of names) {
            expect(artworkViewBox(name)).toEqual(artworkViewBox(name, "bounds"));
        }
    });
});
