import React from "react";
import SceneRenderer from "./SceneRenderer";
import type { SceneElementData } from "./sceneTypes";
import { animationEngine } from "../animation/AnimationEngine";
import { timelineEngine } from "../timeline/TimelineEngine";
import type { RenderContext } from "../renderer/RenderContext";


type Props = {
    element:SceneElementData;
    context: RenderContext;
};


export default function GroupRenderer({
    element,
    context
}: Props) {
    const timeline = timelineEngine.resolve(element, context);

    if (!timeline.visible)
        return null;

    const animation = animationEngine.resolve(element.animations ?? [], context);

    const style:React.CSSProperties = {
        position: "absolute",
        left: element.x,
        top: element.y,
        transform:`
            scale(
                ${animation.scale ?? 1}
            )
            rotate(
                ${animation.rotation ?? 0}deg
            )
        `,
        opacity: animation.opacity ?? 1
    };

    return (
        <div style={style}>
            <SceneRenderer
                elements={element.children ?? []}
                context={context}
            />
        </div>
    );
}