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
        pixelRatio = 3,
        doTrimToBoundingBox = true,
    }: PngExportOptions = {}
    // pixelRatio = 3,
    // doTrimToBoundingBox = true,
) {
    if (!ref.current) {
        throw new Error("targetRef.current is null");
    }

    let dataUrl = await toPng(
        ref.current,
        {
            pixelRatio,
            backgroundColor: "transparent",
            cacheBust: true,
        }
    );

    if (doTrimToBoundingBox) {
        const trimmedDataUrl = await trimTransparentPng(dataUrl);
        dataUrl = trimmedDataUrl
    }
    

    return dataUrl.replace(/^data:image\/png;base64,/, "");
}