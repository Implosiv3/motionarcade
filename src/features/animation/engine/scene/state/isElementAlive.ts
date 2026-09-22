import type { SceneElementData } from "../sceneTypes";

export function isElementAlive(
    element: SceneElementData,
    frame: number,
): boolean {
    return (
        frame >= element.startFrame &&
        frame < element.endFrame
    );
}