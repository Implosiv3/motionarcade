import { waitAnimationRender } from "../../../utils/animation";

export async function withoutPreviewScale<T>(
    node: HTMLElement,
    callback: () => Promise<T>
): Promise<T> {

    const previousTransform =
        node.style.transform;

    const previousTransformOrigin =
        node.style.transformOrigin;

    try {

        node.style.transform = "none";
        node.style.transformOrigin = "top left";

        await waitAnimationRender();

        return await callback();

    } finally {

        node.style.transform =
            previousTransform;

        node.style.transformOrigin =
            previousTransformOrigin;

        await waitAnimationRender();

    }

}