import type { RenderContext } from "./RenderContext";


type RenderContextProps = {
    frame: number;
    fps: number;
    width: number;
    height: number;
};


export function createRenderContext({
    frame,
    fps,
    width,
    height
}: RenderContextProps): RenderContext {
    return {
        frame,
        fps,
        time: frame / fps,
        width,
        height,
    };
}