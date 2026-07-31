import type {
    SceneData
} from "../scene/sceneTypes";


export type ProjectData = {

    id:string;

    name:string;


    width:number;

    height:number;


    fps:number;


    duration:number;


    scenes:SceneData[];

};