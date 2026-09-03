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


function renderTargetToDataUrl(
    gl: THREE.WebGLRenderer,
    renderTarget: THREE.WebGLRenderTarget,
    width: number,
    height: number
): string {

    const pixels =
        new Uint8Array(
            width *
            height *
            4
        );


    gl.readRenderTargetPixels(
        renderTarget,
        0,
        0,
        width,
        height,
        pixels
    );


    const flippedPixels =
        new Uint8ClampedArray(
            pixels.length
        );


    const rowSize =
        width *
        4;


    for (
        let y = 0;
        y < height;
        y++
    ) {

        const sourceOffset =
            y *
            rowSize;

        const targetOffset =
            (height - 1 - y) *
            rowSize;


        flippedPixels.set(
            pixels.subarray(
                sourceOffset,
                sourceOffset + rowSize
            ),
            targetOffset
        );
    }


    const imageData =
        new ImageData(
            flippedPixels,
            width,
            height
        );


    const canvas =
        document.createElement(
            "canvas"
        );


    canvas.width =
        width;

    canvas.height =
        height;


    const context =
        canvas.getContext(
            "2d"
        );


    if (!context) {
        throw new Error(
            "Could not create 2D canvas context"
        );
    }


    context.putImageData(
        imageData,
        0,
        0
    );


    return canvas.toDataURL(
        "image/png"
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

                            const renderScale = 2;

                            const renderWidth =
                                exportWidth * renderScale;

                            const renderHeight =
                                exportHeight * renderScale;

                            const camera =
                                cameraRef.current;


                            if (!camera) {
                                throw new Error(
                                    "3D export camera is not ready"
                                );
                            }


                            /*
                             * RenderTarget used only
                             * for the export.
                             */

                            const renderTarget =
                                new THREE.WebGLRenderTarget(
                                    renderWidth,
                                    renderHeight,
                                    {
                                        format: THREE.RGBAFormat,
                                        type: THREE.UnsignedByteType,
                                        depthBuffer: true,
                                        stencilBuffer: false,
                                    }
                                );


                            /*
                             * Save renderer state.
                             */

                            const previousRenderTarget =
                                gl.getRenderTarget();


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
                                 * The export must use the
                                 * same perspective camera,
                                 * but with the aspect ratio
                                 * of the requested output.
                                 */

                                camera.aspect =
                                    exportWidth /
                                    exportHeight;

                                camera.position.z =
                                    getCameraZ(
                                        height
                                    );

                                camera.updateProjectionMatrix();


                                /*
                                 * Render at the requested
                                 * export resolution.
                                 */

                                gl.setRenderTarget(
                                    renderTarget
                                );


                                gl.setViewport(
                                    0,
                                    0,
                                    exportWidth,
                                    exportHeight
                                );


                                gl.setScissor(
                                    0,
                                    0,
                                    exportWidth,
                                    exportHeight
                                );


                                gl.setScissorTest(
                                    false
                                );


                                gl.outputColorSpace =
                                    THREE.SRGBColorSpace;


                                gl.clear(
                                    true,
                                    true,
                                    true
                                );


                                gl.render(
                                    scene,
                                    camera
                                );


                                dataUrl =
                                    renderTargetToDataUrl(
                                        gl,
                                        renderTarget,
                                        exportWidth,
                                        exportHeight
                                    );

                            }
                            finally {

                                /*
                                 * Restore renderer.
                                 */

                                gl.setRenderTarget(
                                    previousRenderTarget
                                );


                                gl.setViewport(
                                    previousViewport
                                );

                                // gl.setViewport(
                                //     0,
                                //     0,
                                //     renderWidth,
                                //     renderHeight
                                // );


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


                                renderTarget.dispose();

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