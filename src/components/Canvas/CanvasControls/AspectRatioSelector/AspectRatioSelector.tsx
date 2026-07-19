import { ASPECT_RATIOS } from "../../../../features/canvas/aspectRatios";
import { useCanvasStore } from "../../../../store/canvasStore";
import "./AspectRatioSelector.scss"


export function AspectRatioSelector() {
  const aspectRatio = useCanvasStore(state => state.canvas.aspectRatio);
  const setAspectRatio = useCanvasStore(state => state.setAspectRatio);

  return (
    <select
        className="aspect-ratio-selector"
        value={aspectRatio.id}
        onChange={(e) => {
            const ratio = ASPECT_RATIOS.find(
                r => r.id === e.target.value
            );

            if (ratio) {
                setAspectRatio(ratio);
                }
            }}
    >
        {ASPECT_RATIOS.map(ratio => (
            <option key={ratio.id} value={ratio.id}>
                {ratio.label}
            </option>
        ))}
    </select>
  );
}