import type { PngExportOptions } from "./exporters/htmlToPng2d";

declare global {
    interface Window {
        exportPng?: (
            options?: PngExportOptions
        ) => Promise<string>;
    }
}

let exportNode: HTMLElement | null = null;

export function registerExportPng(
    fn: (
        options?: PngExportOptions
    ) => Promise<string>
) {
    window.exportPng = fn;

    return () => {
        delete window.exportPng;
    };
}

export function registerExportNode(
    node: HTMLElement
) {
    exportNode = node;

    return () => {
        exportNode = null;
    };
}

export function getExportNode() {

    if (!exportNode) {
        throw new Error(
            "No export node registered"
        );
    }

    return exportNode;

}