export type FrameIndexSpecification = {
    type: "frame";
    value: number;
};


export type TimeSpecification = {
    type: "time";
    value: number;
};


export type ProgressSpecification = {
    type: "progress";
    value: number;
};


export type TemporalSpecification =
    | FrameIndexSpecification
    | TimeSpecification
    | ProgressSpecification;


export type SceneConfigKeyframe = {
    time: TemporalSpecification;
    value: unknown;
};


export type SceneConfigTrack = {
    property: string;
    type?: string;
    easing?: string;

    keyframes: SceneConfigKeyframe[];
};


export type SceneElementConfig = {
    id: string;
    type: string;

    x: number;
    y: number;

    width?: number;
    height?: number;

    anchor?: {
        x: number;
        y: number;
    };

    /*
     * The element temporal range can be specified
     * using frames, seconds or progress.
     *
     * Progress is resolved relative to the scene.
     */
    start: TemporalSpecification;
    end: TemporalSpecification;

    props?: Record<string, any>;

    tracks?: SceneConfigTrack[];

    children?: SceneElementConfig[];
};


export type SceneConfigAudioClip = {
    src: string;

    start: TemporalSpecification;
    end: TemporalSpecification;

    volume?: number;
};


export type SceneConfig = {
    width: number;
    height: number;

    /*
     * Scene duration is expressed in seconds.
     *
     * The resolver converts this into totalFrames.
     */
    duration: number;

    fps: number;

    elements: SceneElementConfig[];

    audio: SceneConfigAudioClip[];
};