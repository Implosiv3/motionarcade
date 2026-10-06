import { useAnimationStore } from "../../../../../features/animation/store/animationStore";
import "./AnimationFrameSelector.scss";


export default function AnimationFrameSelector() {

    const {
        currentFrame,
        totalFrames,
        setFrame,
    } = useAnimationStore();


    const maxFrame =
        Math.max(
            0,
            totalFrames - 1
        );


    return (
        <div
            key="animation-frame-selector"
            className="field"
        >

            <input
                type="range"
                min={0}
                max={maxFrame}
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
                    max={maxFrame}
                    value={currentFrame}
                    onChange={(e) =>
                        setFrame(
                            Number(
                                e.target.value
                            )
                        )
                    }
                />

                {" "}/ {maxFrame}

            </div>

        </div>
    );
}