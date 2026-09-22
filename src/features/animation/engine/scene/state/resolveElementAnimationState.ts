import type { RenderContext } from "../../renderer/RenderContext";
import type { SceneElementData } from "../sceneTypes";

export type ElementAnimationState = {
    frame: number;
    time: number;
    progress: number;
};

export function resolveElementAnimationState(
    element: SceneElementData,
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