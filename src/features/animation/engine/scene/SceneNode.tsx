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
    const x = transform.position.x + transform.offset.x;
    const y = transform.position.y + transform.offset.y;

    // TODO: I think I have to update the anchor
    console.log('SceneNode.tsx is including a div')

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