import "./Canvas.scss";

import { useRef } from "react";

import {
    useCanvasStore
} from "../../store/canvasStore";

import Canvas2D from "./Canvas2D";

import CanvasControls from "./CanvasControls/CanvasControls";
import AnimationControls from "./CanvasControls/AnimationControls/AnimationControls";
import DownloadControls from "./CanvasControls/DownloadControls/DownloadControls";

import {
    useHtmlToPng2d
} from "../../features/export/hooks/useHtmlToPng2d";

import type {
    SceneData
} from "../../features/animation/engine/scene/sceneTypes";


type CanvasProps = {
    scene: SceneData;
};


export default function Canvas({
    scene
}:CanvasProps){

    const mode = useCanvasStore(
        state => state.canvas.mode
    );

    const exportQuality = useCanvasStore(
        state => state.canvas.exportQuality
    );

    const ref = useRef<HTMLDivElement>(null);

    const previewWidth = 960;
    const previewHeight = 540;

    const scale = previewWidth / scene.width;

    useHtmlToPng2d(
        ref,
        {
            pixelRatio:
                exportQuality.scaleFactor,

            doTrimToBoundingBox:false
        }
    );

    return (
        <div className="canvas-wrapper">
            <div className="canvas-container">
                <div
                    className={`canvas canvas-${mode}-mode`}
                    style={{
                        width:previewWidth,
                        height:previewHeight
                    }}
                >
                    <div
                        ref={ref}
                        className="canvas-render-surface"
                        style={{
                            width:scene.width,
                            height:scene.height,
                            transform:`scale(${scale})`,
                            transformOrigin:"top left"
                        }}
                    >
                        <Canvas2D
                            scene={scene}
                        />
                    </div>
                </div>

                <CanvasControls />
                <AnimationControls />
                <DownloadControls />
            </div>
        </div>
    );
}