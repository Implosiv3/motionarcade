export type PropertyKeyframe = {
    frame: number;
    value: any;
};


export type PropertyTrack = {
    property: string;
    keyframes: PropertyKeyframe[];
};