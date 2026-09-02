import { type RefObject } from "react";

import { toPng } from "html-to-image";

import { trimTransparentPng } from "../utils/trimTransparentPng";

import {
    getExport3dCanvas
} from "../exportRegistry";


export interface PngExportOptions {
    pixelRatio?: number;
    doTrimToBoundingBox?: boolean;
}


function loadImage(
    dataUrl: string
): Promise<HTMLImageElement> {

    return new Promise(
        (
            resolve,
            reject
        ) => {

            const image =
                new Image();

            image.onload =
                () => resolve(image);

            image.onerror =
                reject;

            image.src =
                dataUrl;
        }
    );
}


export async function htmlToPng2d(
    ref: RefObject<HTMLElement | null>,
    {
        pixelRatio = 6,
        doTrimToBoundingBox = true,
    }: PngExportOptions = {}
) {

    if (!ref.current) {
        throw new Error(
            "targetRef.current is null"
        );
    }


    /*
     * Export the 2D layer.
     */
    const dataUrl2d =
        await toPng(
            ref.current,
            {
                pixelRatio,
                backgroundColor:
                    "transparent",
                cacheBust: true,
            }
        );


    const render3d =
        getExport3dCanvas();


    /*
     * No 3D layer registered.
     *
     * Keep the original 2D export.
     */
    if (!render3d) {

        let dataUrl =
            dataUrl2d;


        if (
            doTrimToBoundingBox
        ) {

            dataUrl =
                await trimTransparentPng(
                    dataUrl
                );

        }


        return dataUrl.replace(
            /^data:image\/png;base64,/,
            ""
        );
    }


    const image2d =
        await loadImage(
            dataUrl2d
        );


    /*
     * The 2D image defines the
     * final export resolution.
     */
    const output =
        document.createElement(
            "canvas"
        );


    output.width =
        image2d.naturalWidth;

    output.height =
        image2d.naturalHeight;


    const ctx =
        output.getContext(
            "2d"
        );


    if (!ctx) {
        throw new Error(
            "Could not create 2D canvas context"
        );
    }


    /*
     * Draw 2D first.
     */
    ctx.drawImage(
        image2d,
        0,
        0
    );


    /*
     * Ask Three.js to render directly
     * at the final export resolution.
     *
     * There is no 960x540 bitmap
     * being enlarged anymore.
     */
    const dataUrl3d =
        await render3d(
            output.width,
            output.height
        );


    const image3d =
        await loadImage(
            dataUrl3d
        );


    /*
     * The 3D image already has exactly
     * the same resolution as the output.
     */
    ctx.drawImage(
        image3d,
        0,
        0
    );


    let dataUrl =
        output.toDataURL(
            "image/png"
        );


    if (
        doTrimToBoundingBox
    ) {

        dataUrl =
            await trimTransparentPng(
                dataUrl
            );

    }


    return dataUrl.replace(
        /^data:image\/png;base64,/,
        ""
    );
}