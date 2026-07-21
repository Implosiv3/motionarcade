import "./Canvas.scss";
import Canvas2D from "./Canvas2D";
import Canvas3D from "./Canvas3D";
import { useRef } from "react";
import { useCanvasStore } from "../../store/canvasStore";
import CanvasControls from "./CanvasControls/CanvasControls";
import AnimationControls from "./CanvasControls/AnimationControls/AnimationControls";
import DownloadControls from "./CanvasControls/DownloadControls/DownloadControls";
import { useHtmlToPng2d } from "../../features/export/hooks/useHtmlToPng2d";

type CanvasProps = {
    type?: "2d" | "3d";
    children?: React.ReactNode;
};


export default function Canvas({
    type = "2d",
    children,
}: CanvasProps) {
    const aspectRatio = useCanvasStore(state => state.canvas.aspectRatio);
    const mode = useCanvasStore(state => state.canvas.mode)
    const exportQuality = useCanvasStore(state => state.canvas.exportQuality);
    
    const scale = 1.0
    const ref = useRef<HTMLDivElement>(null);

    useHtmlToPng2d(
        ref,
        {
            pixelRatio: exportQuality.scaleFactor,
            doTrimToBoundingBox: false
        }
    )

    return (
        <div className="canvas-wrapper">
            <CanvasControls />
            <div className="canvas-container">
                <div
                    className={`canvas canvas-${mode}-mode`}
                    id="canvas"
                    style={{
                        width: aspectRatio.width,
                        height: aspectRatio.height,
                        transform: `scale(${scale})`,
                        transformOrigin: "center",
                    }}
                >
                    <div
                        className="canvas-render-surface"
                        ref={ref}
                    >
                        {
                            type === "2d"
                            ? (
                                <Canvas2D>
                                    {children}
                                </Canvas2D>
                            )
                            :
                            (
                                <Canvas3D>
                                    {children}
                                </Canvas3D>
                            )
                        }
                    </div>
                </div>
                <AnimationControls />
                <DownloadControls />
            </div>
        </div>
    );
}