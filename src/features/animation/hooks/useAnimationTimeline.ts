import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useAnimationStore } from "../store/animationStore";

type BuildTimeline = (
    tl: gsap.core.Timeline
) => void;

export function useAnimationTimeline(
    scope: React.RefObject<Element | null>,
    build: BuildTimeline,
    deps: React.DependencyList = [],
) {
    const timeline = useRef<gsap.core.Timeline>(null);

    const progress = useAnimationStore(
        s => s.progress
    );

    useGSAP(() => {
        const tl = gsap.timeline({
            paused: true
        });

        build(tl);

        timeline.current = tl;

    }, {
        scope,
        dependencies: deps,
    });

    useEffect(() => {
        timeline.current?.progress(progress);
    }, [progress]);

    return timeline;
}