import {
    createRenderContext
} from "../../features/animation/engine/renderer/createRenderContext";

import SceneRenderer from "../../features/animation/engine/scene/SceneRenderer";

import type {
    SceneData
} from "../../features/animation/engine/scene/sceneTypes";

import {
    useAnimationStore
} from "../../features/animation/store/animationStore";


type Canvas2DProps = {
    scene:SceneData;

    width:number;
    height:number;
};


export default function Canvas2D({
    scene,
    width,
    height
}:Canvas2DProps){

    const frame =
        useAnimationStore(
            state => state.currentFrame
        );

    const context =
        createRenderContext({

            frame,

            fps:scene.fps,

            sceneWidth:scene.width,
            sceneHeight:scene.height,

            renderWidth:width,
            renderHeight:height

        });

    return (
        <SceneRenderer
            elements={scene.elements}
            context={context}
        />
    );
}