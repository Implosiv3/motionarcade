import { getExportNode } from "../features/export/exportRegistry";
import { exportPngsToVideo } from "../features/export/exporters/pngsToVideo";
import { withoutPreviewScale } from "../features/export/utils/withoutPreviewScale";

export async function exportVideo() {

    if (!window.exportPng) {
        throw new Error(
            "No export function registered"
        );
    }

    const node =
        getExportNode();

    return withoutPreviewScale(
        node,
        () =>
            exportPngsToVideo({
                outputFilename: "animation.mov",
                exportPngFunction: window.exportPng!
            })
    );

}