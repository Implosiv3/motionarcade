import "./AnimationControls.scss";
import AnimationFpsInput from "./AnimationFpsInput/AnimationFpsInput";
import AnimationFrameSelector from "./AnimationFrameSelector/AnimationFrameSelector";
import AnimationDurationInput from "./AnimationDurationInput/AnimationDurationInput";


export default function AnimationControls() {
    return (
        <div className="animation-controls">
            <AnimationFpsInput></AnimationFpsInput>
            <AnimationDurationInput></AnimationDurationInput>
            <AnimationFrameSelector></AnimationFrameSelector>
        </div>
    );
}