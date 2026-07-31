import SceneNode from "./SceneNode";
import SceneElement from "./SceneElement";
import { componentRegistry } from "../components/componentRegistry";
import { resolveElementState } from "./state/resolveElementState";
import type { SceneElementData } from "./sceneTypes";
import type { TransformState } from "../renderer/TransformState";
import type { RenderContext } from "../renderer/RenderContext";
import { mergeTransform } from "../renderer/mergeTransform";


type SceneRendererProps = {
    elements:SceneElementData[];

    context: RenderContext;

    transform?: TransformState;
};


export default function SceneRenderer({
    elements,
    context,
    // TODO: This should be good for groups
    transform
}: SceneRendererProps) {
    const parentTransform =
        transform ?? {
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            opacity: 1
        };

    return (
        <>
        {
            elements.map(
                element => {
                    const state = resolveElementState(element, context);

                    if (state.transform.visible === false) {
                        return null;
                    }

                    const worldTransform = mergeTransform(
                        parentTransform,
                        state.transform
                    );

                    /*
                     * Group
                     */
                    if (
                        element.children &&
                        element.children.length
                    ) {
                        return (
                            <SceneNode
                                key={element.id}
                                state={{
                                    ...state,
                                    transform: worldTransform
                                }}
                            >
                                <SceneRenderer
                                    elements={element.children}
                                    context={context}
                                />
                            </SceneNode>
                        );
                    }

                    /*
                     * Single component
                     */
                    const Component = componentRegistry.get(element.type);

                    if (!Component)
                        return null;

                    return (
                        <SceneNode
                            key={element.id}
                            state={{
                                ...state,
                                transform: worldTransform
                            }}
                        >
                            <SceneElement>
                                <Component
                                    state={state}
                                    context={context}
                                    {...element.props}
                                />
                            </SceneElement>
                        </SceneNode>
                    );
                }
            )
        }
        </>
    );
}