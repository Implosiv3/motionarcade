import { createRenderContext } from "../../features/animation/engine/renderer/createRenderContext";
import SceneRenderer from "../../features/animation/engine/scene/SceneRenderer";
import type { SceneData } from "../../features/animation/engine/scene/sceneTypes";
import { useAnimationStore } from "../../features/animation/store/animationStore";


type Canvas2DProps = {
    scene:SceneData;
};


export default function Canvas2D({
    scene
}:Canvas2DProps){
    const frame = useAnimationStore(state => state.currentFrame);
    const context =
        createRenderContext({
            frame,
            fps: scene.fps,
            width: scene.width,
            height: scene.height
        });

    return (
        <SceneRenderer
            elements={scene.elements}
            context={context}
        />
    );
}