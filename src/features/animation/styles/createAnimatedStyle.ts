import type { AnimatedProperties } from "./types";


export function createAnimatedStyle(
    props: AnimatedProperties
): React.CSSProperties {
    const transforms: string[] = [];

    if (props.x !== undefined) {
        transforms.push(`translateX(${props.x}px)`);
    }

    if (props.y !== undefined) {
        transforms.push(`translateY(${props.y}px)`);
    }

    if (props.scale !== undefined) {
        transforms.push(`scale(${props.scale})`);
    }

    if (props.rotation !== undefined) {
        transforms.push(`rotate(${props.rotation}deg)`);
    }

    return {
        ...(props.opacity !== undefined
            ? { opacity:props.opacity }
            : {}),

        ...(transforms.length > 0
            ? { transform: transforms.join(" ")}
            : {})
    };
}