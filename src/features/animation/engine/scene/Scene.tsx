// TODO: I don't think we use this one
import React from "react";

import { useCanvasStore } from "../../store/canvasStore";
import { createRenderContext } from "../render/createRenderContext";

import SceneRenderer from "./SceneRenderer";

import type {
    SceneData
} from "./sceneTypes";


type SceneProps = {
    data: SceneData;
};


export default function Scene({
    data
}: SceneProps) {


    const currentFrame =
        useCanvasStore(
            state => state.animation.currentFrame
        );


    const fps =
        useCanvasStore(
            state => state.animation.fps
        );


    const context =
        createRenderContext({

            frame: currentFrame,

            fps,

            width:data.width,

            height:data.height

        });



    return (

        <SceneRenderer

            scene={data}

            context={context}

        />

    );
}