import { useCanvasStore } from "../../../../store/canvasStore";
import { Sun, Moon } from "lucide-react";
import "./ModeSelector.scss";

export default function ModeSelector() {
    const mode = useCanvasStore(state => state.canvas.mode);
    const setMode = useCanvasStore(state => state.setMode);

    const isDark = mode === "dark";

    return (
        <button
            className={`mode-selector ${isDark ? "dark" : "light"}`}
            onClick={() =>
                setMode(isDark ? "light" : "dark")
            }
            aria-label="Toggle canvas mode"
        >
            {isDark ? <Moon /> : <Sun />}
        </button>
    );
}