import {
    useRef
} from "react";

import {
    Canvas
} from "@react-three/fiber";

import {
    PerspectiveCamera
} from "@react-three/drei";

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

import {
    registerExport3dCanvas
} from "../../../export/exportRegistry";


type Scene3DLayerProps = {
    elements: SceneElementData[];
    context: RenderContext;
};


const CAMERA_FOV = 50;


function getCameraZ(
    height: number
): number {
    const fovRadians =
        CAMERA_FOV *
        Math.PI /
        180;

    return (
        height / 2
    ) /
    Math.tan(
        fovRadians / 2
    );
}


export default function Scene3DLayer({
    elements,
    context,
}: Scene3DLayerProps) {

    const cameraRef =
        useRef<THREE.PerspectiveCamera>(null);


    /*
     * Convert the composition dimensions
     * into Three.js scene units.
     */

    const width =
        context.width *
        SCENE_SCALE;

    const height =
        context.height *
        SCENE_SCALE;


    /*
     * Position the perspective camera so that
     * the visible vertical area matches the
     * composition height.
     */

    const cameraZ =
        getCameraZ(height);


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

                onCreated={({
                    gl,
                    scene
                }) => {

                    gl.setClearColor(
                        0x000000,
                        0
                    );

                    gl.outputColorSpace =
                        THREE.SRGBColorSpace;


                    registerExport3dCanvas(
                        async (
                            exportWidth,
                            exportHeight
                        ) => {

                            const camera =
                                cameraRef.current;

                            if (!camera) {
                                throw new Error(
                                    "3D export camera is not ready"
                                );
                            }


                            /*
                             * Render resolution.
                             */

                            const renderScale = 1;

                            const renderWidth =
                                exportWidth *
                                renderScale;

                            const renderHeight =
                                exportHeight *
                                renderScale;


                            /*
                             * Save renderer state.
                             */

                            const previousWidth =
                                gl.domElement.width;

                            const previousHeight =
                                gl.domElement.height;

                            const previousPixelRatio =
                                gl.getPixelRatio();

                            const previousViewport =
                                new THREE.Vector4();

                            gl.getViewport(
                                previousViewport
                            );

                            const previousScissor =
                                new THREE.Vector4();

                            gl.getScissor(
                                previousScissor
                            );

                            const previousScissorTest =
                                gl.getScissorTest();


                            /*
                             * Save camera state.
                             */

                            const previousAspect =
                                camera.aspect;

                            const previousPositionZ =
                                camera.position.z;


                            let dataUrl: string;


                            try {

                                /*
                                 * Use the same PerspectiveCamera
                                 * as the preview.
                                 */

                                camera.aspect =
                                    renderWidth /
                                    renderHeight;

                                camera.position.z =
                                    getCameraZ(height);

                                camera.updateProjectionMatrix();


                                /*
                                 * Render directly to the WebGL canvas.
                                 */

                                gl.setRenderTarget(
                                    null
                                );


                                /*
                                 * Disable the preview DPR
                                 * temporarily.
                                 */

                                gl.setPixelRatio(
                                    1
                                );

                                gl.setSize(
                                    renderWidth,
                                    renderHeight,
                                    false
                                );

                                gl.setViewport(
                                    0,
                                    0,
                                    renderWidth,
                                    renderHeight
                                );

                                gl.setScissor(
                                    0,
                                    0,
                                    renderWidth,
                                    renderHeight
                                );

                                gl.setScissorTest(
                                    false
                                );


                                /*
                                 * Keep the same color
                                 * pipeline as the preview.
                                 */

                                gl.outputColorSpace =
                                    THREE.SRGBColorSpace;

                                gl.setClearColor(
                                    0x000000,
                                    0
                                );

                                gl.clear(
                                    true,
                                    true,
                                    true
                                );


                                gl.render(
                                    scene,
                                    camera
                                );


                                /*
                                 * Get the PNG directly
                                 * from the WebGL canvas.
                                 */

                                dataUrl =
                                    gl.domElement.toDataURL(
                                        "image/png"
                                    );

                            }
                            finally {

                                /*
                                 * Restore renderer state.
                                 */

                                gl.setPixelRatio(
                                    previousPixelRatio
                                );

                                gl.setSize(
                                    previousWidth,
                                    previousHeight,
                                    false
                                );

                                gl.setViewport(
                                    previousViewport
                                );

                                gl.setScissor(
                                    previousScissor
                                );

                                gl.setScissorTest(
                                    previousScissorTest
                                );


                                /*
                                 * Restore camera.
                                 */

                                camera.aspect =
                                    previousAspect;

                                camera.position.z =
                                    previousPositionZ;

                                camera.updateProjectionMatrix();


                                /*
                                 * Restore preview.
                                 */

                                gl.render(
                                    scene,
                                    camera
                                );
                            }


                            return dataUrl;
                        }
                    );

                }}
            >

                <PerspectiveCamera
                    ref={cameraRef}

                    makeDefault

                    position={[
                        0,
                        0,
                        cameraZ
                    ]}

                    fov={
                        CAMERA_FOV
                    }

                    aspect={
                        width /
                        height
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