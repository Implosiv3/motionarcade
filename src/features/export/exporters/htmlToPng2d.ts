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

            console.time(
                "[Export] canvas.toBlob"
            );


            canvas.toBlob(
                async (blob) => {

                    console.timeEnd(
                        "[Export] canvas.toBlob"
                    );


                    if (!blob) {

                        reject(
                            new Error(
                                "Could not export canvas to PNG"
                            )
                        );

                        return;

                    }


                    console.time(
                        "[Export] blob.arrayBuffer"
                    );


                    const bytes =
                        new Uint8Array(
                            await blob.arrayBuffer()
                        );


                    console.timeEnd(
                        "[Export] blob.arrayBuffer"
                    );


                    console.log(
                        "[Export] PNG bytes:",
                        bytes.length
                    );


                    resolve(
                        bytes
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

    console.time(
        "[Export] bytesToDataUrl"
    );


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


    const result =
        "data:image/png;base64," +
        btoa(binary);


    console.timeEnd(
        "[Export] bytesToDataUrl"
    );


    return result;

}


function dataUrlToBytes(
    dataUrl: string
): Uint8Array {

    console.time(
        "[Export] dataUrlToBytes"
    );


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


    console.timeEnd(
        "[Export] dataUrlToBytes"
    );


    return bytes;

}


function pngResultToDataUrl(
    result: Uint8Array | string
): string {

    console.time(
        "[Export] pngResultToDataUrl"
    );


    let dataUrl: string;


    if (
        typeof result === "string"
    ) {

        dataUrl =
            result.startsWith(
                "data:image/png;base64,"
            )
                ? result
                : `data:image/png;base64,${result}`;

    }
    else {

        dataUrl =
            bytesToDataUrl(
                result
            );

    }


    console.timeEnd(
        "[Export] pngResultToDataUrl"
    );


    return dataUrl;

}


export async function htmlToPng2d(
    ref: RefObject<HTMLElement | null>,
    {
        pixelRatio = 6,
        doTrimToBoundingBox = true,
    }: PngExportOptions = {}
): Promise<Uint8Array> {

    console.time(
        "[Export] htmlToPng2d TOTAL"
    );


    if (!ref.current) {

        throw new Error(
            "targetRef.current is null"
        );

    }


    console.time(
        "[Export] html-to-image toCanvas"
    );


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


    console.timeEnd(
        "[Export] html-to-image toCanvas"
    );


    console.log(
        "[Export] 2D canvas:",
        canvas.width,
        "x",
        canvas.height
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


            const result =
                dataUrlToBytes(
                    trimmedDataUrl
                );


            console.timeEnd(
                "[Export] htmlToPng2d TOTAL"
            );


            return result;

        }


        const result =
            await canvasToPngBytes(
                canvas
            );


        console.timeEnd(
            "[Export] htmlToPng2d TOTAL"
        );


        return result;

    }


    console.time(
        "[Export] create output canvas"
    );


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


    console.timeEnd(
        "[Export] create output canvas"
    );


    console.time(
        "[Export] draw 2D canvas"
    );


    ctx.drawImage(
        canvas,
        0,
        0
    );


    console.timeEnd(
        "[Export] draw 2D canvas"
    );


    const renderScale = 1;


    const renderWidth =
        output.width *
        renderScale;


    const renderHeight =
        output.height *
        renderScale;


    console.log(
        "[Export] 3D render size:",
        renderWidth,
        "x",
        renderHeight
    );


    console.time(
        "[Export] render3d"
    );


    const data3d =
        await render3d(
            renderWidth,
            renderHeight
        );


    console.timeEnd(
        "[Export] render3d"
    );


    console.log(
        "[Export] 3D result bytes:",
        typeof data3d === "string"
            ? data3d.length
            : data3d.length
    );


    console.time(
        "[Export] 3D result → data URL"
    );


    const dataUrl3d =
        pngResultToDataUrl(
            data3d as
                Uint8Array |
                string
        );


    console.timeEnd(
        "[Export] 3D result → data URL"
    );


    console.time(
        "[Export] load 3D Image"
    );


    const image3d =
        await loadImage(
            dataUrl3d
        );


    console.timeEnd(
        "[Export] load 3D Image"
    );


    console.time(
        "[Export] draw 3D image"
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


    console.timeEnd(
        "[Export] draw 3D image"
    );


    if (
        doTrimToBoundingBox
    ) {

        console.time(
            "[Export] trim"
        );


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


        const result =
            dataUrlToBytes(
                trimmedDataUrl
            );


        console.timeEnd(
            "[Export] trim"
        );


        console.timeEnd(
            "[Export] htmlToPng2d TOTAL"
        );


        return result;

    }


    const result =
        await canvasToPngBytes(
            output
        );


    console.timeEnd(
        "[Export] htmlToPng2d TOTAL"
    );


    return result;

}