import type { ElementState } from "./state/ElementState";

type SceneNodeProps = {
    children: React.ReactNode;
    state: ElementState;
    id?: string;
};

export default function SceneNode({
    children,
    state,
}: SceneNodeProps) {

    const transform = state.transform;

    const x =
        transform.position.x +
        transform.offset.x;

    const y =
        transform.position.y +
        transform.offset.y;

    const scaleX =
        typeof transform.scale === "number"
            ? transform.scale
            : transform.scale.x;

    const scaleY =
        typeof transform.scale === "number"
            ? transform.scale
            : transform.scale.y;

    const anchor = state.layout.anchor;

    const anchorX =
        (anchor?.x ?? 0.5) * 100;

    const anchorY =
        (anchor?.y ?? 0.5) * 100;

    return (
        <div
            style={{
                position: "absolute",
                left: x,
                top: y,
                transform: `
                    translate(-50%, -50%)
                    scale(${scaleX}, ${scaleY})
                    rotate(${transform.rotation}deg)
                `,
                transformOrigin: `${anchorX}% ${anchorY}%`,
                opacity: transform.opacity,
            }}
        >
            {children}
        </div>
    );
}