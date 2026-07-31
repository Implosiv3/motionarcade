import type { RenderContext } from "../../renderer/RenderContext";
import { evaluateTracks } from "../../timeline/TimelineEvaluator";
import type { SceneElementData } from "../sceneTypes";
import { defaultElementState } from "./defaultElementState";

export function resolveElementState(
    element: SceneElementData,
    context: RenderContext
){
    const evaluated =
        evaluateTracks(
            element.tracks ?? [],
            context.frame
        );

console.log(
    "evaluated tracks",
    evaluated
);

    const positionX =
        evaluated["position.x"] ??
        element.x;

    const positionY =
        evaluated["position.y"] ??
        element.y;

    const offsetX =
        evaluated["offset.x"] ??
        0;

    const offsetY =
        evaluated["offset.y"] ??
        0;

    const state = {
        transform:{
            position:{
                x: positionX,
                y: positionY
            },

            offset:{
                x: offsetX,
                y: offsetY
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

        layout:{
            width:element.width,
            height:element.height,
            anchor:
                element.anchor
        },

        properties:{
            ...evaluated
        }
    };

    console.log({
    id:element.id,
    elementX:element.x,
    elementY:element.y,
    positionX:evaluated["position.x"],
    positionY:evaluated["position.y"],
    offsetX:evaluated["offset.x"],
    offsetY:evaluated["offset.y"]
});

console.log(
    "FINAL STATE",
    state
);

    return state;
}