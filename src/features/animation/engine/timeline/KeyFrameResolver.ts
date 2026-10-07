import type { RenderTimelineKeyframe } from "@implosiv3/motionarcade-types";

export type ResolvedKeyframes = {
    previous: Keyframe;
    next: Keyframe;
};

export function resolveKeyframes(
    keyframes: RenderTimelineKeyframe[],
    frame: number
): ResolvedKeyframes | null {
    const sorted = [...keyframes].sort((a, b) => a.frame - b.frame);

    if (sorted.length === 0)
        return null;

    if (frame <= sorted[0].frame) {
        return {
            previous: sorted[0],
            next: sorted[0]
        };
    }

    if (frame >= sorted[sorted.length - 1].frame) {
        return {
            previous: sorted[sorted.length - 1],
            next: sorted[sorted.length - 1]
        };
    }

    for (let i = 0; i < sorted.length - 1; i++) {
        const previous = sorted[i];
        const next = sorted[i + 1];

        if (
            frame >= previous.frame &&
            frame <= next.frame
        ) {
            return {
                previous,
                next
            };
        }
    }

    return null;
}