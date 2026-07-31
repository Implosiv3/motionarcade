import "./CanvasControls.scss";
import CanvasAspectRatioSelector from "./CanvasAspectRatioSelector/CanvasAspectRatioSelector";
import ModeSelector from "./ModeSelector/ModeSelector";


export default function CanvasControls() {
    return (
        <div className="canvas-controls">
            {/* <CanvasAspectRatioSelector></CanvasAspectRatioSelector> */}
            <ModeSelector></ModeSelector>
        </div>
    );
}