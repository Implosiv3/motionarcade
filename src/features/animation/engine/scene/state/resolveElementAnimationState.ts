import type { RenderElement } from "@implosiv3/motionarcade-types";
import type { RenderContext } from "../../renderer/RenderContext";

export type ElementAnimationState = {
    frame: number;
    time: number;
    progress: number;
};

export function resolveElementAnimationState(
    element: RenderElement,
    context: RenderContext,
): ElementAnimationState {
    const duration = element.endFrame - element.startFrame;
    const frame = context.frame - element.startFrame;
    const progress = duration <= 1 ? 1 : frame / (duration - 1);

    return {
        frame,
        time: frame / context.fps,
        progress,
    };
}