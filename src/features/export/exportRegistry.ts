import type {
    PngExportOptions,
} from "./exporters/htmlToPng2d";


export type PngExportResult =
    Uint8Array;


declare global {
    interface Window {
        exportPng?: (
            options?: PngExportOptions
        ) => Promise<PngExportResult>;

        renderFrame?: (
            frame: number
        ) => Promise<void>;

        exportFrame?: () => Promise<PngExportResult>;
    }
}


type Export3dRenderer = (
    width: number,
    height: number
) => Promise<PngExportResult>;


let exportNode:
    HTMLElement | null = null;

let export3dRenderer:
    Export3dRenderer | null = null;


export function registerExportPng(
    fn: (
        options?: PngExportOptions
    ) => Promise<PngExportResult>
) {
    window.exportPng = fn;

    return () => {
        delete window.exportPng;
    };
}


export function registerRenderFrame(
    fn: (
        frame: number
    ) => Promise<void>
) {
    window.renderFrame = fn;

    return () => {
        if (
            window.renderFrame === fn
        ) {
            delete window.renderFrame;
        }
    };
}


export function registerExportFrame(
    fn: () => Promise<PngExportResult>
) {
    window.exportFrame = fn;

    return () => {
        if (
            window.exportFrame === fn
        ) {
            delete window.exportFrame;
        }
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