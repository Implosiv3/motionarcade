import React from "react";

import SceneRenderer from "../scene/SceneRenderer";

import type {
    SceneData
} from "../scene/sceneTypes";


import type {
    RenderContext
} from "../render/RenderContext";



type Props = {

    scene:SceneData;

    context:RenderContext;

};



export default function ProjectRenderer({

    scene,

    context

}:Props){


    return (

        <SceneRenderer

            elements={
                scene.elements
            }

            context={
                context
            }

        />

    );

}