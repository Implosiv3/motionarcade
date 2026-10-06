import Canvas from "../../components/Canvas/Canvas";

import {
    resolveScene
} from "../../features/animation/engine/scene/resolveScene";

import { testScene } from "../../features/animation/engine/scene/scenes/testScene";


const renderScene =
    resolveScene(
        testScene
    );

console.log(
    JSON.stringify(
        renderScene,
        null,
        4
    )
);


export default function MainView() {

    return (
        <Canvas
            scene={renderScene}
        />
    );

}