import type { RenderContext } from "../../renderer/RenderContext";
import { evaluateTracks } from "../../timeline/TimelineEvaluator";
import type { SceneElementData } from "../sceneTypes";
import { defaultElementState } from "./defaultElementState";

export function resolveElementState(
    element: SceneElementData,
    context: RenderContext,
) {
    const evaluated = evaluateTracks(
        element.tracks ?? [],
        context.frame,
    );

    const positionX =
        evaluated["position.x"] ?? element.x;

    const positionY =
        evaluated["position.y"] ?? element.y;

    const offsetX =
        evaluated["offset.x"] ?? 0;

    const offsetY =
        evaluated["offset.y"] ?? 0;

    return {
        transform: {
            position: {
                x: positionX,
                y: positionY,
            },

            offset: {
                x: offsetX,
                y: offsetY,
            },

            scale:
                evaluated.scale ??
                defaultElementState.transform.scale,

            rotation:
                evaluated.rotation ??
                defaultElementState.transform.rotation,

            opacity:
                evaluated.opacity ??
                defaultElementState.transform.opacity,

            visible:
                evaluated.visible ??
                defaultElementState.transform.visible,
        },

        layout: {
            width: element.width,
            height: element.height,
            anchor: element.anchor,
        },

        properties: {
            ...evaluated,
        },
    };
}