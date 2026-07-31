import type { ElementState } from "./state/ElementState";


type SceneNodeProps = {
    children: React.ReactNode;
    state: ElementState;
};

export default function SceneNode({
    children,
    state
}: SceneNodeProps){
    const transform = state.transform;

    return (
        <div
            style={{
                position: "absolute",
                left: transform.x,
                top: transform.y,
                transform:
                    `
                    scale(${transform.scale})
                    rotate(${transform.rotation}deg)
                    `,
                opacity: transform.opacity
            }}
        >
            {children}
        </div>
    );
}