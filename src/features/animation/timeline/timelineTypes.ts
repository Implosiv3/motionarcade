import type { ComponentAnimation } from "../animationTypes";


export type FrameRange = {
    startFrame: number;
    endFrame: number;
};

export type ComponentTimelineData = {
    life: FrameRange;

    animations: ComponentAnimation[];
};