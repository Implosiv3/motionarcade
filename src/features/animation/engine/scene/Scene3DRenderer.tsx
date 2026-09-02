import {
    AnimationElementProvider,
} from "@implosiv3/fr8mer-components";

import SceneNode3D from "./SceneNode3D";

import type { RenderContext } from "../renderer/RenderContext";
import type { ResolvedSceneElement } from "./SceneRenderer";

type Scene3DRendererProps = {
    elements: ResolvedSceneElement[];
    context: RenderContext;
};

export default function Scene3DRenderer({
    elements,
    context,
}: Scene3DRendererProps) {
    return (
        <>
            {elements.map(
                ({
                    element,
                    definition,
                    state,
                    animationState,
                }) => {
                    const Component =
                        definition.component;

                    return (
                        <AnimationElementProvider
                            key={element.id}
                            value={animationState}
                        >
                            <SceneNode3D
                                state={state}
                                context={context}
                            >
                                <Component
                                    state={state}
                                    context={context}
                                    {...element.props}
                                />
                            </SceneNode3D>
                        </AnimationElementProvider>
                    );
                },
            )}
        </>
    );
}