import { Canvas } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import * as THREE from "three";

import Scene3DRenderer from "./Scene3DRenderer";

import {
    SCENE_SCALE
} from "./transform/sceneToThree";

import type {
    RenderContext
} from "../renderer/RenderContext";

import type {
    SceneElementData
} from "./sceneTypes";
import { registerExport3dCanvas } from "../../../export/exportRegistry";


type Scene3DLayerProps = {
    elements: SceneElementData[];
    context: RenderContext;
};


export default function Scene3DLayer({
    elements,
    context,
}: Scene3DLayerProps) {

    const width =
        context.width *
        SCENE_SCALE;

    const height =
        context.height *
        SCENE_SCALE;

    return (
        <div
            style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
            }}
        >
            <Canvas
                dpr={1}
                gl={{
                    antialias: true,
                    alpha: true,
                    preserveDrawingBuffer: true,
                }}
                onCreated={({ gl }) => {

                    gl.setClearColor(
                        0x000000,
                        0
                    );

                    gl.outputColorSpace =
                        THREE.SRGBColorSpace;

                    registerExport3dCanvas(
                        gl.domElement
                    );
                }}
            >

                <OrthographicCamera
                    makeDefault
                    position={[
                        0,
                        0,
                        10
                    ]}
                    left={
                        -width / 2
                    }
                    right={
                        width / 2
                    }
                    top={
                        height / 2
                    }
                    bottom={
                        -height / 2
                    }
                    near={0.1}
                    far={1000}
                />

                <ambientLight
                    intensity={1.5}
                />

                <directionalLight
                    position={[
                        5,
                        5,
                        5
                    ]}
                    intensity={2}
                />

                <directionalLight
                    position={[
                        -5,
                        -5,
                        3
                    ]}
                    intensity={1}
                />

                <Scene3DRenderer
                    elements={elements}
                    context={context}
                />

            </Canvas>
        </div>
    );
}