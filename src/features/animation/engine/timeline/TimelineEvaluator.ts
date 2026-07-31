import type { TimelineTrack } from "./TimelineTrack";
import { interpolateValue } from "./InterpolationResolver";
import { resolveKeyframes } from "./KeyFrameResolver";
import { calculateProgress } from "../animation/utils/progress";
import { applyEasing } from "../animation/utils/easing";
import { lerp } from "../animation/utils/lerp";


function evaluateTrack(
    track: TimelineTrack,
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

    // return interpolateValue(
    //     previous.value,
    //     next.value,
    //     progress
    // );
}

export function evaluateTracks(
    tracks: TimelineTrack[],
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