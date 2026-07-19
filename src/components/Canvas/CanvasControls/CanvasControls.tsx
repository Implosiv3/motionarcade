import "./CanvasControls.scss";
import { AspectRatioSelector } from "./AspectRatioSelector/AspectRatioSelector";
import ModeSelector from "./ModeSelector/ModeSelector";


export default function CanvasControls() {
    return (
        <div className="canvas-controls">
            <AspectRatioSelector></AspectRatioSelector>
            <ModeSelector></ModeSelector>
        </div>
    );
}