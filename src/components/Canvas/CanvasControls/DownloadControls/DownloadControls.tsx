import "./DownloadControls.scss";
import { Image, Download, Play, Film } from "lucide-react";
import { exportVideo } from "../../../../utils/export";
import { useAnimationStore } from "../../../../features/animation/store/animationStore";
import { waitAnimationRender } from "../../../../utils/animation";
import DownloadExportQualitySelector from "./DownloadExportQualitySelector/DownloadExportQualitySelector";
import { getExportNode } from "../../../../features/export/exportRegistry";
import { withoutPreviewScale } from "../../../../features/export/utils/withoutPreviewScale";
import type { SceneData } from "../../../../features/animation/engine/scene/sceneTypes";


type DownloadControlsProps = {
    scene: SceneData;
};

export default function DownloadControls({
    scene,
}: DownloadControlsProps) {
    // TODO: Faked, by now
    const isAnimated = true

    const {
        // fps,
        // duration,
        // currentFrame,
        totalFrames,
        // configure,
        setFrame,
    } = useAnimationStore();

    const handleDownload = async () => {
        if (!window.exportPng) {
            console.log('window.exportPng not detected');
            return;
        }

        const node = getExportNode();

        const base64 =
            await withoutPreviewScale(
                node,
                () => window.exportPng!()
            );

        const link = document.createElement("a");

        link.href = `data:image/png;base64,${base64}`;
        link.download = "component.png";

        link.click();
    };

    const previewAnimation = async () => {
        for (let frame = 0; frame < totalFrames; frame++) {
            setFrame(frame);
            await waitAnimationRender();
        }

        setFrame(0);
    };

    const handleExportVideo = () => {
        exportVideo(scene.audio);
    };

    return (
        <div className="preview-actions">
            <button
                id="download-png"
                    className="action-button primary"
                    onClick={handleDownload}
            >
                <Download size={18} />
                &nbsp;
                <Image size={18} />
            </button>

            {isAnimated && (
                <button
                    className="action-button"
                    onClick={previewAnimation}
                >
                    <Play size={18} />
                    &nbsp;
                    <Film size={18} />
                </button>
            )}

            {isAnimated && (
                <button
                    id="download-video"
                    className="action-button primary"
                    onClick={handleExportVideo}
                >
                    <Download size={18} />
                    &nbsp;
                    <Film size={18} />
                </button>
            )}

            <DownloadExportQualitySelector />
        </div>
    );
}



