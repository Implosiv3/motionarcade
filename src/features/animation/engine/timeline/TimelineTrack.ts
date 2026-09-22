import type { EasingType } from "../utils/easing";

export type Keyframe = {
    frame: number;
    value: any;
};


export type TimelineTrack = {
    property: string;
    type:
        | "number"
        | "boolean"
        | "string";

    easing?: EasingType;
        
    keyframes: Keyframe[];
};