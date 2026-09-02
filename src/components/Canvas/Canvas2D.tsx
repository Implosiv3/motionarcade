import type { RenderContext } from "../../features/animation/engine/renderer/RenderContext";
import SceneRenderer from "../../features/animation/engine/scene/SceneRenderer";
import type { SceneData } from "../../features/animation/engine/scene/sceneTypes";

type Canvas2DProps = {
    scene: SceneData;
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