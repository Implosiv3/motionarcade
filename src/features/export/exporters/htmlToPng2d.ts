import { type RefObject } from "react";
import { toPng } from "html-to-image";
import { trimTransparentPng } from "../utils/trimTransparentPng";

export interface PngExportOptions {
    pixelRatio?: number;
    doTrimToBoundingBox?: boolean;
}

export async function htmlToPng2d(
    ref: RefObject<HTMLElement | null>,
    {
        pixelRatio = 6,
        doTrimToBoundingBox = true,
    }: PngExportOptions = {}
) {
    if (!ref.current) {
        throw new Error("targetRef.current is null");
    }

    const node = ref.current;

    const previousTransform = node.style.transform;
    const previousTransformOrigin = node.style.transformOrigin;

    try {
        // La preview está escalada únicamente para verse en pantalla.
        // Para exportar queremos la escena a tamaño real.
        node.style.transform = "none";
        node.style.transformOrigin = "top left";

        // Dejamos que el navegador aplique el cambio.
        await new Promise(requestAnimationFrame);

        let dataUrl = await toPng(node, {
            pixelRatio,
            backgroundColor: "transparent",
            cacheBust: true,
        });

        if (doTrimToBoundingBox) {
            dataUrl = await trimTransparentPng(dataUrl);
        }

        return dataUrl.replace(/^data:image\/png;base64,/, "");
    } finally {
        node.style.transform = previousTransform;
        node.style.transformOrigin = previousTransformOrigin;
    }
}