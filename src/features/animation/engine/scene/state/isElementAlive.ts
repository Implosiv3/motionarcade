import type { RenderElement } from "@implosiv3/motionarcade-types";

export function isElementAlive(
    element: RenderElement,
    frame: number,
): boolean {
    return (
        frame >= element.startFrame &&
        frame < element.endFrame
    );
}