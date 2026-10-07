import type { RenderConfig } from "@implosiv3/motionarcade-types";
import type { RenderContext } from "../../features/animation/engine/renderer/RenderContext";
import SceneRenderer from "../../features/animation/engine/scene/SceneRenderer";

type Canvas2DProps = {
    scene: RenderConfig;
    context: RenderContext;
};

export default function Canvas2D({
    scene,
    context,
}: Canvas2DProps) {
    return (
        <SceneRenderer
            elements={scene.elements}
            context={context}
            renderer="2d"
        />
    );
}