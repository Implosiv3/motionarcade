import { useEffect } from "react";
import * as THREE from "three";
import { registerExportPng } from "../exportRegistry";
import { htmlToPng3d } from "../exporters/htmlToPng3d";


type Props = {
  rendererRef: React.RefObject<THREE.WebGLRenderer | null>;
  sceneRef: React.RefObject<THREE.Scene | null>;
  cameraRef: React.RefObject<THREE.Camera | null>;
  doTrimToBoundingBoxx?: boolean;
};

export function useHtmlToPng3d({
    rendererRef,
    sceneRef,
    cameraRef,
    doTrimToBoundingBoxx = true,
}: Props) {
    useEffect(() => {
        return registerExportPng(
            async ({
                width = 400,
                height = 400,
                doTrimToBoundingBox = doTrimToBoundingBoxx,
            } = {}) => {
                const renderer = rendererRef.current;
                const scene = sceneRef.current;
                const camera = cameraRef.current;

                if (!renderer || !scene || !camera) {
                    throw new Error("Three scene not ready");
                }

                return htmlToPng3d({
                    renderer,
                    scene,
                    camera,
                    width,
                    height,
                    doTrimToBoundingBox,
                });
            }
        );
    }, []);
}