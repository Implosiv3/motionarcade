import { useAnimationStore } from "../../../../../features/animation/store/animationStore";
import "./AnimationFrameSelector.scss"


export default function AnimationFrameSelector() {
    // const fps = useAnimationStore(s => s.fps);
    // const duration = useAnimationStore(s => s.duration);
    // const setFrame = useAnimationStore(s => s.configure);

    const {
        fps,
        duration,
        currentFrame,
        totalFrames,
        // configure,
        setFrame,
    } = useAnimationStore();

    return (
        <div
            key="animation-frame-selector"
            className="field"
        >
            <input
                type="range"
                min={0}
                max={
                    Math.max(
                    0,
                    Math.round(
                        fps * duration
                    ) - 1
                    )
                }
                value={currentFrame}
                onChange={(e) =>
                    setFrame(
                    Number(
                        e.target.value
                    )
                    )
                }
            />

            <div className="frame-selector">
                Frame{" "}
                <input
                    type="number"
                    min={0}
                    max={totalFrames - 1}
                    value={currentFrame}
                    onChange={(e) =>
                    setFrame(
                        Number(e.target.value)
                    )
                    }
                />{" "}
                / {totalFrames - 1}
            </div>
        </div>
    );
}







