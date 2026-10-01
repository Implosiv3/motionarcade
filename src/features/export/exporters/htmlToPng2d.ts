import { type RefObject } from "react";
import { toCanvas } from "html-to-image";

import { trimTransparentPng } from "../utils/trimTransparentPng";
import { getExport3dCanvas } from "../exportRegistry";


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


function canvasToPngBytes(
    canvas: HTMLCanvasElement
): Promise<Uint8Array> {
    return new Promise(
        (
            resolve,
            reject
        ) => {
            canvas.toBlob(
                async (blob) => {
                    if (!blob) {
                        reject(
                            new Error(
                                "Could not export canvas to PNG"
                            )
                        );
                        return;
                    }

                    resolve(
                        new Uint8Array(
                            await blob.arrayBuffer()
                        )
                    );
                },
                "image/png"
            );
        }
    );
}


function bytesToDataUrl(
    bytes: Uint8Array
): string {
    let binary = "";

    const chunkSize = 0x8000;

    for (
        let i = 0;
        i < bytes.length;
        i += chunkSize
    ) {
        const chunk =
            bytes.subarray(
                i,
                Math.min(
                    i + chunkSize,
                    bytes.length
                )
            );

        binary +=
            String.fromCharCode(
                ...chunk
            );
    }

    return (
        "data:image/png;base64," +
        btoa(binary)
    );
}


function dataUrlToBytes(
    dataUrl: string
): Uint8Array {
    const base64 =
        dataUrl.replace(
            /^data:image\/png;base64,/,
            ""
        );

    const binary =
        atob(base64);

    const bytes =
        new Uint8Array(
            binary.length
        );

    for (
        let i = 0;
        i < binary.length;
        i++
    ) {
        bytes[i] =
            binary.charCodeAt(i);
    }

    return bytes;
}


function pngResultToDataUrl(
    result: Uint8Array | string
): string {
    if (
        typeof result === "string"
    ) {
        return result.startsWith(
            "data:image/png;base64,"
        )
            ? result
            : `data:image/png;base64,${result}`;
    }

    return bytesToDataUrl(
        result
    );
}


export async function htmlToPng2d(
    ref: RefObject<HTMLElement | null>,
    {
        pixelRatio = 6,
        doTrimToBoundingBox = true,
    }: PngExportOptions = {}
): Promise<Uint8Array> {

    if (!ref.current) {
        throw new Error(
            "targetRef.current is null"
        );
    }


    const canvas =
        await toCanvas(
            ref.current,
            {
                pixelRatio,
                backgroundColor:
                    "transparent",
                cacheBust: false,
            }
        );


    const render3d =
        getExport3dCanvas();


    if (!render3d) {

        if (
            doTrimToBoundingBox
        ) {
            const pngBytes =
                await canvasToPngBytes(
                    canvas
                );

            const dataUrl =
                bytesToDataUrl(
                    pngBytes
                );

            const trimmedDataUrl =
                await trimTransparentPng(
                    dataUrl
                );

            return dataUrlToBytes(
                trimmedDataUrl
            );
        }

        return canvasToPngBytes(
            canvas
        );
    }


    const output =
        document.createElement(
            "canvas"
        );

    output.width =
        canvas.width;

    output.height =
        canvas.height;


    const ctx =
        output.getContext(
            "2d"
        );

    if (!ctx) {
        throw new Error(
            "Could not create 2D canvas context"
        );
    }


    ctx.drawImage(
        canvas,
        0,
        0
    );


    const renderScale = 1;

    const renderWidth =
        output.width *
        renderScale;

    const renderHeight =
        output.height *
        renderScale;


    const data3d =
        await render3d(
            renderWidth,
            renderHeight
        );


    const dataUrl3d =
        pngResultToDataUrl(
            data3d as
                Uint8Array |
                string
        );

    const image3d =
        await loadImage(
            dataUrl3d
        );


    ctx.imageSmoothingEnabled =
        true;

    ctx.imageSmoothingQuality =
        "high";


    ctx.drawImage(
        image3d,
        0,
        0,
        renderWidth,
        renderHeight,
        0,
        0,
        output.width,
        output.height
    );


    if (
        doTrimToBoundingBox
    ) {
        const pngBytes =
            await canvasToPngBytes(
                output
            );

        const dataUrl =
            bytesToDataUrl(
                pngBytes
            );

        const trimmedDataUrl =
            await trimTransparentPng(
                dataUrl
            );

        return dataUrlToBytes(
            trimmedDataUrl
        );
    }


    return canvasToPngBytes(
        output
    );
}