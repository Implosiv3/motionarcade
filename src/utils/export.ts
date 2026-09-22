import { getExportNode } from "../features/export/exportRegistry";
import { exportPngsToVideo } from "../features/export/exporters/pngsToVideo";
import { withoutPreviewScale } from "../features/export/utils/withoutPreviewScale";
import type { AudioClip } from "../features/export/types/AudioClip";

export async function exportVideo(
    audio: AudioClip[] = []
) {
    if (!window.exportPng) {
        throw new Error(
            "No export function registered"
        );
    }

    const node = getExportNode();

    return withoutPreviewScale(
        node,
        () =>
            exportPngsToVideo({
                outputFilename: "animation.mov",
                exportPngFunction: window.exportPng!,
                audio,
            })
    );
}