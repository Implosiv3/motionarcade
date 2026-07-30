import { animationRegistry } from "./animationRegistry";
import type { ComponentAnimation } from "./animationTypes";


export function resolveAnimation(
    animations: ComponentAnimation[],
    frame: number
) {
    return animations.reduce(
        (styles, animation) => {
            const duration = animation.endFrame - animation.startFrame;

            if (duration <= 0)
                return styles;

            const progress = duration <= 0 ? 1 : (frame - animation.startFrame) / duration;
            const clamped = Math.max(0, Math.min(1, progress));
            const resolver = animationRegistry[animation.type];

            if (!resolver)
                return styles;


            return {
                ...styles,
                ...resolver({
                    progress: clamped,
                    props: animation.props ?? {}
                })
            };
        },
        {}
    );
}