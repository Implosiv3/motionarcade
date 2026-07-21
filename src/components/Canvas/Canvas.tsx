import { useRef } from "react";
import { useCanvasStore } from "../../store/canvasStore";
import "./Canvas.scss";
import AnimationControls from "./CanvasControls/AnimationControls/AnimationControls";
import CanvasControls from "./CanvasControls/CanvasControls";
import DownloadControls from "./CanvasControls/DownloadControls/DownloadControls";
import { useHtmlToPng2d } from "../../features/export/hooks/useHtmlToPng2d";


type CanvasProps = {
  aspectRatio: number; // ejemplo: 16/9, 1, 9/16
  children?: React.ReactNode;
};

export default function Canvas({
  children
}: CanvasProps) {
  const aspectRatio = useCanvasStore(state => state.canvas.aspectRatio);
  const mode = useCanvasStore(state => state.canvas.mode)
  const exportQuality = useCanvasStore(state => state.canvas.exportQuality);

    // TODO: Get the scale from somewhere
  // const scale = Math.min(
  //   containerWidth / aspectRatio.width,
  //   containerHeight / aspectRatio.height
  // );
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
            { children }
          </div>
        </div>
        <AnimationControls />
        <DownloadControls />
      </div>
    </div>
  );
}