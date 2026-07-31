import { componentRegistry } from "./componentRegistry";
import ProgressBar from "./ProgressBar/ProgressBar";


// import PopMessage from "../components/PopMessage/PopMessage";




export function registerComponents(){

    // componentRegistry.register(
    //     "PopMessage",
    //     PopMessage
    // );

    componentRegistry.set(
        "ProgressBar",
        ProgressBar
    );

}