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

    const rotation3dX =
        evaluated["rotation3d.x"] ??
        defaultElementState.transform.rotation3d.x;

    const rotation3dY =
        evaluated["rotation3d.y"] ??
        defaultElementState.transform.rotation3d.y;

    const rotation3dZ =
        evaluated["rotation3d.z"] ??
        defaultElementState.transform.rotation3d.z;

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

            rotation3d: {
                x: rotation3dX,
                y: rotation3dY,
                z: rotation3dZ,
            },

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