import type { ElementState } from "./state/ElementState";
import type { RenderContext } from "../renderer/RenderContext";
import { sceneToThree } from "./transform/sceneToThree";

type SceneNode3DProps = {
    children: React.ReactNode;
    state: ElementState;
    context: RenderContext;
};

export default function SceneNode3D({
    children,
    state,
    context,
}: SceneNode3DProps) {
    const transform = state.transform;

    const x =
        transform.position.x +
        transform.offset.x;

    const y =
        transform.position.y +
        transform.offset.y;

    const position = sceneToThree({
        x,
        y,
        width: context.width,
        height: context.height,
    });

    return (
        <group
            position={[
                position.x,
                position.y,
                0,
            ]}
            scale={transform.scale}
            rotation={[
                0,
                0,
                transform.rotation * Math.PI / 180,
            ]}
        >
            {children}
        </group>
    );
}