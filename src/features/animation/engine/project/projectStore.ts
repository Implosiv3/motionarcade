// TODO: Move to 'store/project.ts'
import { create } from "zustand";

import type {
    ProjectData
} from "../engine/project/projectTypes";



type ProjectState = {

    project:ProjectData;


    setProject(
        project:ProjectData
    ):void;


};



export const useProjectStore =
create<ProjectState>((set)=>({


    project:{

        id:"default",

        name:"Untitled",


        width:1920,

        height:1080,


        fps:30,


        duration:450,


        scenes:[]

    },



    setProject(project){

        set({
            project
        });

    }


}));