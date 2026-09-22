import {
    AnimationElementProvider,
} from "@implosiv3/fr8mer-components";

import SceneNode from "./SceneNode";

import { componentRegistry } from "../components/componentRegistry";
import { resolveElementState } from "./state/resolveElementState";
import { resolveElementAnimationState } from "./state/resolveElementAnimationState";

import type { SceneElementData } from "./sceneTypes";
import type { RenderContext } from "../renderer/RenderContext";

import { isElementAlive } from "./state/isElementAlive";

type SceneRendererProps = {
    elements: SceneElementData[];
    context: RenderContext;
    renderer: "2d" | "3d";
};

export default function SceneRenderer({
    elements,
    context,
    renderer,
}: SceneRendererProps) {

    return (
        <>
            {elements.map((element) => {

                const definition =
                    componentRegistry.get(
                        element.type
                    );

                if (!definition) {
                    return null;
                }

                if (
                    definition.renderer !==
                    renderer
                ) {
                    return null;
                }

                const state =
                    resolveElementState(
                        element,
                        context
                    );

                if (
                    !isElementAlive(
                        element,
                        context.frame
                    )
                ) {
                    return null;
                }

                if (
                    state.transform.visible ===
                    false
                ) {
                    return null;
                }

                const animationState =
                    resolveElementAnimationState(
                        element,
                        context
                    );

                const Component =
                    definition.component;

                return (
                    <AnimationElementProvider
                        key={element.id}
                        value={animationState}
                    >
                        <SceneNode
                            state={state}
                        >
                            <Component
                                state={state}
                                context={context}
                                {...element.props}
                            />
                        </SceneNode>
                    </AnimationElementProvider>
                );
            })}
        </>
    );
}