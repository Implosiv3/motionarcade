// TODO: I don't think we are using this
import type {
    SceneData
} from "../scene/sceneTypes";


import {
    SceneElementRuntime
} from "./SceneElementRuntime";



export class SceneRuntime {


    elements:SceneElementRuntime[];



    constructor(
        scene:SceneData
    ){

        this.elements =
            scene.elements.map(
                element =>
                    new SceneElementRuntime(
                        element
                    )
            );

    }



    getElement(
        id:string
    ){

        return this.elements.find(
            element =>
                element.id === id
        );

    }



    getVisibleElements(
        frame:number
    ){

        return this.elements.filter(
            element =>
                element.isVisible(frame)
        );

    }



}


