import "./Canvas.scss";

import {
    useCanvasStore
} from "../../store/canvasStore";

import Canvas2D from "./Canvas2D";
import Scene3DLayer from "../../features/animation/engine/scene/Scene3DLayer";

import CanvasControls from "./CanvasControls/CanvasControls";
import AnimationControls from "./CanvasControls/AnimationControls/AnimationControls";
import DownloadControls from "./CanvasControls/DownloadControls/DownloadControls";

import {
    useHtmlToPng2d
} from "../../features/export/hooks/useHtmlToPng2d";

import {
    createRenderContext
} from "../../features/animation/engine/renderer/createRenderContext";

import {
    useAnimationStore
} from "../../features/animation/store/animationStore";

import {
    AnimationProvider
} from "@implosiv3/fr8mer-components";

import type {
    SceneData
} from "../../features/animation/engine/scene/sceneTypes";

import {
    useEffect,
    useRef
} from "react";


type CanvasProps = {
    scene: SceneData;
};


export default function Canvas({
    scene
}: CanvasProps) {

    const mode =
        useCanvasStore(
            state =>
                state.canvas.mode
        );

    const exportQuality =
        useCanvasStore(
            state =>
                state.canvas.exportQuality
        );

    const frame =
        useAnimationStore(
            state =>
                state.currentFrame
        );

    const ref =
        useRef<HTMLDivElement>(null);


    const previewWidth = 960;
    const previewHeight = 540;


    const scale =
        previewWidth /
        scene.width;


    const context =
        createRenderContext({
            frame,
            fps: scene.fps,
            width: scene.width,
            height: scene.height,
        });


    /*
     * Debug the actual 2D element after
     * React has applied its styles.
     */

    useEffect(() => {

        if (!ref.current) {
            return;
        }


        const rect =
            ref.current.getBoundingClientRect();


        const computed =
            getComputedStyle(
                ref.current
            );


        console.log(
            "CANVAS 2D ELEMENT:",
            {
                sceneWidth:
                    scene.width,

                sceneHeight:
                    scene.height,

                scale,

                inlineWidth:
                    ref.current.style.width,

                inlineHeight:
                    ref.current.style.height,

                inlineTransform:
                    ref.current.style.transform,

                computedWidth:
                    computed.width,

                computedHeight:
                    computed.height,

                computedTransform:
                    computed.transform,

                boundingWidth:
                    rect.width,

                boundingHeight:
                    rect.height,
            }
        );

    }, [
        scene.width,
        scene.height,
        scale
    ]);


    useHtmlToPng2d(
        ref,
        {
            pixelRatio:
                exportQuality.scaleFactor,

            doTrimToBoundingBox:
                false
        }
    );


    return (
        <AnimationProvider
            value={{
                frame: context.frame,
                fps: context.fps,
                time: context.time,
            }}
        >

            <div className="canvas-wrapper">

                <div className="canvas-container">

                    <div
                        className={`canvas canvas-${mode}-mode`}
                        style={{
                            width: previewWidth,
                            height: previewHeight
                        }}
                    >

                        {/* 2D */}

                        <div
                            ref={ref}
                            className="canvas-render-surface"
                            style={{
                                width: scene.width,
                                height: scene.height,
                                transform:
                                    `scale(${scale})`,
                                transformOrigin:
                                    "top left"
                            }}
                        >

                            <Canvas2D
                                scene={scene}
                                context={context}
                            />

                        </div>


                        {/* 3D */}

                        <Scene3DLayer
                            elements={scene.elements}
                            context={context}
                        />

                    </div>


                    <CanvasControls />

                    <AnimationControls />

                    <DownloadControls />

                </div>

            </div>

        </AnimationProvider>
    );
}