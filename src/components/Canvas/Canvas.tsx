import { useCanvasStore } from "../../store/canvasStore";
import "./Canvas.scss";
import CanvasControls from "./CanvasControls/CanvasControls";


type CanvasProps = {
  aspectRatio: number; // ejemplo: 16/9, 1, 9/16
  children?: React.ReactNode;
};

export default function Canvas({
  children
}: CanvasProps) {
  const aspectRatio = useCanvasStore(state => state.canvas.aspectRatio);
  const mode = useCanvasStore(state => state.canvas.mode)

    // TODO: Get the scale from somewhere
  // const scale = Math.min(
  //   containerWidth / aspectRatio.width,
  //   containerHeight / aspectRatio.height
  // );
  const scale = 1.0

  return (
    <div className="canvas-wrapper">
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
            { children }
        </div>

        <CanvasControls />
      </div>
    </div>
  );
}