import {
    animationRegistry
} from "./animationRegistry";


import {
    resolveProperties
} from "./PropertyAnimationResolver";


import type {
    ComponentAnimation
} from "./animationTypes";


import type {
    RenderContext
} from "../render/RenderContext";



export class AnimationEngine {


    resolve(

        animations:ComponentAnimation[],

        context:RenderContext

    ){


        const styles =
            animations.reduce(

                (result, animation)=>{


                    if(
                        animation.type === "property"
                    ){
                        return result;
                    }



                    const duration =
                        animation.endFrame -
                        animation.startFrame;



                    if(duration <= 0)
                        return result;



                    const progress =
                        Math.max(
                            0,
                            Math.min(
                                1,
                                (
                                    context.frame -
                                    animation.startFrame
                                )
                                /
                                duration
                            )
                        );



                    const resolver =
                        animationRegistry[
                            animation.type
                        ];



                    if(!resolver)
                        return result;



                    return {

                        ...result,

                        ...resolver({

                            progress,

                            props:
                                animation.props ?? {}

                        })

                    };


                },

                {}

            );



        const properties =
            resolveProperties(
                animations,
                context
            );



        return {

            styles,

            properties

        };

    }

}



export const animationEngine =
    new AnimationEngine();