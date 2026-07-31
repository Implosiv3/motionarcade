export type TransformState = {
    x: number;
    y: number;
    scale: number;
    rotation: number;
    opacity: number;
};


export const defaultTransform: TransformState = {
    x: 0,
    y: 0,
    scale: 1,
    rotation: 0,
    opacity: 1
};