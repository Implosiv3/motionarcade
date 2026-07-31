import "./ProgressBar.scss"


type ProgressBarProps = {
    state:{
        properties:{
            progress?:number;
        };
    };
    stripesSpeed: number;
};


export default function ProgressBar({
    state,
    stripesSpeed = 1,
}: ProgressBarProps) {
  // Stripes speed
  const stripesOffset = -(state.frame * stripesSpeed);
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