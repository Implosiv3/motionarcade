import type { ElementState } from "./state/ElementState";

type SceneNodeProps = {
    children: React.ReactNode;
    state: ElementState;
};

export default function SceneNode({
    children,
    state
}: SceneNodeProps){

    console.log("SceneNode state", state);
console.log("SceneNode transform", state.transform);
console.log("SceneNode position", state.transform.position);

    const transform = state.transform;
    // const x = (transform.position?.x ?? 0) + (transform.offset?.x ?? 0);
    // const y = (transform.position?.y ?? 0) + (transform.offset?.y ?? 0);
    const x = transform.position.x + transform.offset.x;
    const y = transform.position.y + transform.offset.y;

    console.log(x)

    // TODO: I think I have to update the anchor

    return (
        <div
            style={{
                position: "absolute",
                left: x,
                top: y,
                transform:
                    `
                    translate(-50%, -50%)
                    scale(${transform.scale})
                    rotate(${transform.rotation}deg)
                    `,
                transformOrigin: "center center",
                opacity: transform.opacity
            }}
        >
            {children}
        </div>
    );
}