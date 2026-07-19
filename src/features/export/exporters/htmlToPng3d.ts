import * as THREE from "three";
import { trimTransparentPng } from "../utils/trimTransparentPng";
import { three3dCanvasToPng } from "../utils/three3dCanvasToPng";


type HtmlToPng3dProps = {
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.Camera;
    width?: number;
    height?: number;
    doTrimToBoundingBox?: boolean
};

export async function htmlToPng3d({
    renderer,
    scene,
    camera,
    width = 400,
    height = 400,
    doTrimToBoundingBox = true,
}: HtmlToPng3dProps) {
    let png = three3dCanvasToPng({
        renderer,
        scene,
        camera,
        width,
        height,
    });

    if (doTrimToBoundingBox) {
        const trimmedDataUrl = await trimTransparentPng(png);
        png = trimmedDataUrl
    }
    
    return png.replace(/^data:image\/png;base64,/, "");
}