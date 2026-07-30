import { useMemo } from "react";
import { useAnimationStore } from "../store/animationStore";
import { ComponentTimeline } from "./ComponentTimeline";
import { resolveAnimation } from "../resolveAnimation";
import { createAnimatedStyle } from "../styles/createAnimatedStyle";
import type { ComponentTimelineData } from "./timelineTypes";


export function useComponentTimeline(
    data: ComponentTimelineData
) {
    const currentFrame = useAnimationStore(s => s.currentFrame);
    const timeline = useMemo(() => new ComponentTimeline(data), [data]);
    const visible = timeline.isVisible(currentFrame);
    const animations = timeline.getActiveAnimations(currentFrame);
    const properties = resolveAnimation(animations, currentFrame);
    const animatedStyle = createAnimatedStyle(properties);

    return {
        visible,
        animatedStyle
    };
}