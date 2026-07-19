import * as THREE from "three";

type Yhree3dCanvasToPngParams = {
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.Camera;
    width: number;
    height: number;
};

/**
 * Function to capture the png from the 3d
 * three canvas.
 * @param param0 
 * @returns 
 */
export function three3dCanvasToPng({
    renderer,
    scene,
    camera,
    width,
    height,
}: Yhree3dCanvasToPngParams) {
    // Keep original properties
    const originalSize = new THREE.Vector2();
    renderer.getSize(originalSize);
    const perspectiveCamera = camera as THREE.PerspectiveCamera;
    const originalAspect = perspectiveCamera.aspect;

    // Set specific size and render
    renderer.setSize(width, height);
    perspectiveCamera.aspect = width / height;
    perspectiveCamera.updateProjectionMatrix();
    renderer.render(scene, camera);

    const png = renderer.domElement.toDataURL("image/png");

    // Reset to original size
    renderer.setSize(originalSize.x, originalSize.y);
    perspectiveCamera.aspect = originalAspect;
    perspectiveCamera.updateProjectionMatrix();

    return png;
}