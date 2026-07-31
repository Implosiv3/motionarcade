// TODO: I don't think we are using this
import {
    useMemo,
    useState
} from "react";


import type {
    SceneData
} from "../scene/sceneTypes";


import {
    SceneRuntime
} from "./SceneRuntime";



export function useSceneRuntime(
    scene:SceneData
){

    const runtime =
        useMemo(
            () =>
                new SceneRuntime(scene),
            [scene]
        );



    const [
        version,
        setVersion
    ] = useState(0);



    function refresh(){

        setVersion(
            value => value + 1
        );

    }



    function selectElement(
        id:string
    ){

        runtime.elements.forEach(
            element => {

                element.setSelected(
                    element.id === id
                );

            }
        );


        refresh();

    }



    function updatePosition(
        id:string,
        x:number,
        y:number
    ){

        const element =
            runtime.getElement(id);


        if(!element)
            return;


        element.setPosition(
            x,
            y
        );


        refresh();

    }



    return {

        runtime,

        elements:
            runtime.elements,

        selectElement,

        updatePosition,

        version

    };

}