import type { RenderContext } from "../../renderer/RenderContext";
import type { ElementState } from "../../scene/state/ElementState";
import "./ProgressBar.scss"


type ProgressBarProps = {
    state: ElementState;
    context: RenderContext;
    stripesSpeed?:number;
};


export default function ProgressBar({
    state,
    context,
    stripesSpeed = 1,
}: ProgressBarProps) {
  // Stripes speed
  const stripesOffset = -(context.frame * stripesSpeed);
  const progress = state.properties.progress ?? 0;

  return (
    <div className="progress-bar">
        <div
            className="progress-bar__fill"
            style={{
                clipPath: `inset(0 ${100 - progress * 100}% 0 0)`
            }}
        >
            <div
                className="progress-bar__stripes"
                style={{
                    transform: `translateX(${stripesOffset}px)`
                }}
            />
        </div>
    </div>
  );
}