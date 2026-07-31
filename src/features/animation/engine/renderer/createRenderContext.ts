import type { RenderContext } from "./RenderContext";


export function createRenderContext({
    frame,
    fps,
    width,
    height
}: Props): RenderContext {
    return {
        frame,
        fps,
        time: frame / fps,
        width,
        height,
    };
}