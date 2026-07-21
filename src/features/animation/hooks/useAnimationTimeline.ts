// import { useEffect, useRef } from "react";
// import { useGSAP } from "@gsap/react";
// import { gsap } from "gsap";
// import { useAnimationStore } from "../store/animationStore";

// type BuildTimeline = (
//     tl: gsap.core.Timeline
// ) => void;

// export function useAnimationTimeline<T>(
//     ref: React.RefObject<T>,
//     build: (
//         tl: gsap.core.Timeline,
//         target: T
//     ) => void
// ) {
//     const timeline = useRef<gsap.core.Timeline>(null);

//     const progress = useAnimationStore(
//         s => s.progress
//     );

//     useGSAP(() => {
//         const tl = gsap.timeline({
//             paused: true
//         });

//         build(tl);

//         timeline.current = tl;

//     }, {
//         scope,
//         dependencies: deps,
//     });

//     useEffect(() => {
//         timeline.current?.progress(progress);
//     }, [progress]);

//     return timeline;
// }

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useAnimationStore } from "../store/animationStore";


export function useAnimationTimeline<T>(
    ref: React.RefObject<T>,
    build: (
        tl: gsap.core.Timeline,
        target: T
    ) => void
) {
    const timeline = useRef<gsap.core.Timeline>();
    const progress = useAnimationStore(s => s.progress);

    useEffect(() => {
        if (!ref.current) return;

        const tl = gsap.timeline({
            paused:true
        });

        build(tl, ref.current);

        timeline.current = tl;

        return () => {
            tl.kill();
        };
    }, []);

    useEffect(() => {
        timeline.current?.progress(
            progress
        );
    }, [progress]);
}