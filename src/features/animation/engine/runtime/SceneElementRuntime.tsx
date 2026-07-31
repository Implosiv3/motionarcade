// TODO: I don't think we are using this
import type {
    SceneElementData
} from "../scene/sceneTypes";


export class SceneElementRuntime {


    data: SceneElementData;


    selected:boolean = false;



    constructor(
        data:SceneElementData
    ){

        this.data = data;

    }



    get id(){

        return this.data.id;

    }



    get type(){

        return this.data.type;

    }



    get position(){

        return {
            x:this.data.x,
            y:this.data.y
        };

    }



    setPosition(
        x:number,
        y:number
    ){

        this.data.x = x;
        this.data.y = y;

    }



    setSelected(
        value:boolean
    ){

        this.selected = value;

    }



    isVisible(
        frame:number
    ){

        return (
            frame >= this.data.startFrame &&
            frame <= this.data.endFrame
        );

    }



}