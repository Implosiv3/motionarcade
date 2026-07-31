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

    const state = {
        transform:{
            x:
                element.x +
                (evaluated.x ?? 0),

            y:
                element.y +
                (evaluated.y ?? 0),

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
                defaultElementState.transform.visible
        },

        properties:{
            ...evaluated
        }
    };

    return state;
}