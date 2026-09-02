import type { PngExportOptions } from "./exporters/htmlToPng2d";


declare global {
    interface Window {
        exportPng?: (
            options?: PngExportOptions
        ) => Promise<string>;
    }
}


type Export3dRenderer = (
    width: number,
    height: number
) => Promise<string>;


let exportNode: HTMLElement | null = null;

let export3dRenderer: Export3dRenderer | null = null;


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


export function registerExport3dCanvas(
    renderer: Export3dRenderer
) {
    export3dRenderer = renderer;

    return () => {

        if (
            export3dRenderer === renderer
        ) {
            export3dRenderer = null;
        }

    };
}


export function getExport3dCanvas() {

    return export3dRenderer;
}