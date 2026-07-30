import type {
    ComponentAnimation,
} from "../animationTypes";
import type { ComponentTimelineData } from "./timelineTypes";


export class ComponentTimeline {
    private readonly data: ComponentTimelineData;

    constructor(data: ComponentTimelineData) {
        this.data = data;
    }

    isVisible(frame: number): boolean {
        return (
            frame >= this.data.life.startFrame &&
            frame <= this.data.life.endFrame
        );
    }

    getActiveAnimations(frame: number): ComponentAnimation[] {
        return this.data.animations.filter(
            animation =>
                frame >= animation.startFrame &&
                frame <= animation.endFrame
        );
    }

    getData(): ComponentTimelineData {
        return this.data;
    }
}


// import type { ComponentTimelineData } from "./types";

export function defineTimeline(
    timeline: ComponentTimelineData
): ComponentTimelineData {
    return timeline;
}