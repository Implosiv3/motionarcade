import type {
    ComponentAnimation
} from "./animationTypes";
import { lerp } from "./utils/lerp";


export function resolveProperties(

    animations:ComponentAnimation[],

    context

){

    return animations.reduce(

        (state,animation)=>{


            if(
                animation.type !== "property"
            ){
                return state;
            }



            const duration =
                animation.endFrame -
                animation.startFrame;



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



            const from =
                animation.props?.from ?? 0;


            const to =
                animation.props?.to ?? 1;



            return {

                ...state,


                [animation.property]: lerp(from, to, progress)

            };

        },

        {}

    );

}