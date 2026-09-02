import {
    AnimationElementProvider,
} from "@implosiv3/fr8mer-components";

import SceneNode3D from "./SceneNode3D";

import {
    componentRegistry
} from "../components/componentRegistry";

import {
    resolveElementState
} from "./state/resolveElementState";

import {
    resolveElementAnimationState
} from "./state/resolveElementAnimationState";

import {
    isElementAlive
} from "./state/isElementAlive";

import type {
    SceneElementData
} from "./sceneTypes";

import type {
    RenderContext
} from "../renderer/RenderContext";


type Scene3DRendererProps = {
    elements: SceneElementData[];
    context: RenderContext;
};


export default function Scene3DRenderer({
    elements,
    context,
}: Scene3DRendererProps) {

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
                    "3d"
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
            })}
        </>
    );
}