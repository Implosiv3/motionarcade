import type { TimelineTrack } from "../timeline/TimelineTrack";


export type SceneElementData = {
    id:string;
    type:string;

    x:number;
    y:number;

    width?:number;
    height?:number;

    startFrame:number;
    endFrame:number;

    props?:Record<string,any>;
    tracks?:TimelineTrack[];

    children?:SceneElementData[];
};


export type SceneData = {
    width:number;
    height:number;

    fps:number;
    duration:number;

    elements:SceneElementData[];
};