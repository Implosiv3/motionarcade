// TODO: This should not be here
import { exportPngsToVideo } from "../features/export/exporters/pngsToVideo";

export async function exportVideo() {
  if (!window.exportPng) {
    throw new Error(
      "No export function registered"
    );
  }

  return exportPngsToVideo({
    outputFilename: "animation.mov",
    exportPngFunction: window.exportPng,
  });
}