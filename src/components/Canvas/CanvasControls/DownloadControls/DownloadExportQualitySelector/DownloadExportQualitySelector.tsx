import { EXPORT_QUALITIES } from "../../../../../features/canvas/exportQualities";
import { useCanvasStore } from "../../../../../store/canvasStore";
import "./DownloadExportQualitySelector.scss"


export default function DownloadExportQualitySelector() {
  const exportQuality = useCanvasStore(state => state.canvas.exportQuality);
  const setExportQuality = useCanvasStore(state => state.setExportQuality);

  return (
    <select
        className="export-quality-selector"
        value={exportQuality.id}
        onChange={(e) => {
            const quality = EXPORT_QUALITIES.find(
                r => r.id === e.target.value
            );

            if (quality) {
                setExportQuality(quality);
            }
        }}
    >
        {EXPORT_QUALITIES.map(quality => (
            <option key={quality.id} value={quality.id}>
                {quality.label}
            </option>
        ))}
    </select>
  );
}