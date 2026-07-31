import type { TransformState } from "./TransformState";


export function mergeTransform(
    parent: TransformState,
    child: TransformState
): TransformState{
    return {
        x:
            parent.x +
            child.x * parent.scale,

        y:
            parent.y +
            child.y * parent.scale,

        scale:
            parent.scale *
            child.scale,

        rotation:
            parent.rotation +
            child.rotation,

        opacity:
            parent.opacity *
            child.opacity
    };
}