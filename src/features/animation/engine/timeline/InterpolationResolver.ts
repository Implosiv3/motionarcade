import { lerp } from "three/src/math/MathUtils.js";

export function interpolateNumber(
    from: number,
    to: number,
    progress: number
) {
    return lerp(from, to, progress)
    // return (from + (to - from) * progress);
}

export function interpolateValue(
    from: any,
    to: any,
    progress: number
) {
    if (
        typeof from === "number" &&
        typeof to === "number"
    ) {
        return interpolateNumber(from, to, progress);
    }

    return progress < 1 ? from : to;
}