import { resolveKeyframes } from "./KeyFrameResolver";
import { calculateProgress } from "../utils/progress";
import { applyEasing } from "../utils/easing";
import { lerp } from "../utils/lerp";
import type { RenderTimelineTrack } from "@implosiv3/motionarcade-types";


function evaluateTrack(
    track: RenderTimelineTrack,
    frame: number
) {
    const resolved = resolveKeyframes(track.keyframes, frame);

    if (!resolved)
        return undefined;

    const {
        previous,
        next
    } = resolved;

    if (previous.frame === next.frame) {
        return previous.value;
    }

    const progress = calculateProgress(frame, previous.frame, next.frame);
    // const progress = (frame - previous.frame) / (next.frame - previous.frame);
    const easedProgress = applyEasing(progress, track.easing);

    return lerp(
        previous.value,
        next.value,
        easedProgress
    );

}

export function evaluateTracks(
    tracks: RenderTimelineTrack[],
    frame: number
){
    return tracks.reduce(
        (state, track) => {
            return {
                ...state,
                [track.property]: evaluateTrack(track, frame)
            };
        },
        {}
    );
}