import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useAnimationStore } from "../store/animationStore";
import { animationRegistry } from "../animationRegistry";


type AnimationDefinition = {
    type: string;
    startFrame: number;
    endFrame: number;
};


export function useAnimationTimeline(
    ref: React.RefObject<HTMLElement>,
    animations: AnimationDefinition[]
) {
    const timeline = useRef<gsap.core.Timeline | null>(null);

    const currentFrame = useAnimationStore(s => s.currentFrame);
    const fps = useAnimationStore(s => s.fps);


    useEffect(() => {
        if (!ref.current)
            return;

        const tl = gsap.timeline({ paused: true });

        animations.forEach(
            animation => {
                const builder = animationRegistry[animation.type];

                if (!builder)
                    return;

                builder(tl, ref.current!);
            }
        );

        timeline.current = tl;

        return () => {
            tl.kill();

            timeline.current = null;
        };
    }, [animations]);

    useEffect(() => {
        if (!timeline.current)
            return;

        if (animations.length === 0)
            return;

        const startFrame = Math.min(...animations.map(a => a.startFrame));
        const endFrame = Math.max(...animations.map(a => a.endFrame));
        const durationFrames = endFrame - startFrame;

        const currentProgress = (currentFrame - startFrame) / durationFrames;
        const progress = Math.max(0, Math.min(1, currentProgress));

        timeline.current.progress(progress);
    }, [
        currentFrame,
        fps,
        animations
    ]);

}