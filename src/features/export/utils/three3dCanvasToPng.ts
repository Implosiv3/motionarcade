import * as THREE from "three";


type Three3dCanvasToPngParams = {
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.Camera;
    width: number;
    height: number;
};


/**
 * Function to capture the PNG from the 3D
 * Three.js canvas.
 */
export async function three3dCanvasToPng({
    renderer,
    scene,
    camera,
    width,
    height,
}: Three3dCanvasToPngParams): Promise<Uint8Array> {

    // Keep original properties.
    const originalSize = new THREE.Vector2();

    renderer.getSize(
        originalSize
    );

    const perspectiveCamera =
        camera as THREE.PerspectiveCamera;

    const originalAspect =
        perspectiveCamera.aspect;


    // Set specific size and render.
    renderer.setSize(
        width,
        height
    );

    perspectiveCamera.aspect =
        width / height;

    perspectiveCamera.updateProjectionMatrix();

    renderer.render(
        scene,
        camera
    );


    // Export directly to a Blob instead of
    // going through a Base64 data URL.
    const blob =
        await new Promise<Blob>(
            (resolve, reject) => {

                renderer.domElement.toBlob(
                    (result) => {

                        if (!result) {
                            reject(
                                new Error(
                                    "Could not export 3D canvas to PNG"
                                )
                            );

                            return;
                        }

                        resolve(result);
                    },
                    "image/png"
                );

            }
        );


    // Reset to original size.
    renderer.setSize(
        originalSize.x,
        originalSize.y
    );

    perspectiveCamera.aspect =
        originalAspect;

    perspectiveCamera.updateProjectionMatrix();


    return new Uint8Array(
        await blob.arrayBuffer()
    );
}