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

    let dataUrl =
        await toPng(
            ref.current,
            {
                pixelRatio,
                backgroundColor: "transparent",
                cacheBust: true,
            }
        );

    if (doTrimToBoundingBox) {
        dataUrl = await trimTransparentPng(
            dataUrl
        );
    }

    return dataUrl.replace(
        /^data:image\/png;base64,/,
        ""
    );

}