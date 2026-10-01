import * as THREE from "three";

import {
    trimTransparentPng,
} from "../utils/trimTransparentPng";

import {
    three3dCanvasToPng,
} from "../utils/three3dCanvasToPng";


type HtmlToPng3dProps = {
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.Camera;
    width?: number;
    height?: number;
    doTrimToBoundingBox?: boolean;
};


export async function htmlToPng3d({
    renderer,
    scene,
    camera,
    width = 400,
    height = 400,
    doTrimToBoundingBox = true,
}: HtmlToPng3dProps): Promise<Uint8Array> {

    const png =
        await three3dCanvasToPng({
            renderer,
            scene,
            camera,
            width,
            height,
        });


    /*
     * Trimming still uses the old data-URL based
     * utility for now.
     *
     * The normal video export passes
     * doTrimToBoundingBox: false, so this path
     * is not used during the normal export.
     */
    if (doTrimToBoundingBox) {

        const base64 =
            btoa(
                String.fromCharCode(
                    ...png
                )
            );

        const dataUrl =
            `data:image/png;base64,${base64}`;

        const trimmedDataUrl =
            await trimTransparentPng(
                dataUrl
            );

        const trimmedBase64 =
            trimmedDataUrl.replace(
                /^data:image\/png;base64,/,
                ""
            );

        return Uint8Array.from(
            atob(trimmedBase64),
            (c) => c.charCodeAt(0)
        );
    }


    return png;
}