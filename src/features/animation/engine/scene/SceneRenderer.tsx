import {
    AnimationElementProvider,
} from "@implosiv3/fr8mer-components";

import SceneNode from "./SceneNode";
import Scene3DLayer from "./Scene3DLayer";

import { componentRegistry } from "../components/componentRegistry";
import { resolveElementState } from "./state/resolveElementState";
import { resolveElementAnimationState } from "./state/resolveElementAnimationState";

import type { SceneElementData } from "./sceneTypes";
import type { RenderContext } from "../renderer/RenderContext";
import { isElementAlive } from "./state/isElementAlive";

type SceneRendererProps = {
    elements: SceneElementData[];
    context: RenderContext;
};

export type  ResolvedSceneElement = {
    element: SceneElementData;
    definition: {
        component: React.ComponentType<any>;
        renderer: "2d" | "3d";
    };
    state: ReturnType<typeof resolveElementState>;
    animationState: ReturnType<
        typeof resolveElementAnimationState
    >;
};

export default function SceneRenderer({
    elements,
    context,
}: SceneRendererProps) {
    console.log(
        "SCENE RENDER",
        context.frame,
        elements.map((element) => ({
            id: element.id,
            startFrame: element.startFrame,
            endFrame: element.endFrame,
        })),
    );

    const elements2D: ResolvedSceneElement[] = [];
    const elements3D: ResolvedSceneElement[] = [];

    for (const element of elements) {
        const definition = componentRegistry.get(
            element.type,
        );

        if (!definition) {
            continue;
        }

        const state = resolveElementState(
            element,
            context,
        );

        if (!isElementAlive(element, context.frame)) {
            continue;
        }

        if (state.transform.visible === false) {
            continue;
        }

        const animationState =
            resolveElementAnimationState(
                element,
                context,
            );

        const renderedElement = {
            element,
            definition,
            state,
            animationState,
        };

        if (definition.renderer === "3d") {
            elements3D.push(renderedElement);
        } else {
            elements2D.push(renderedElement);
        }
    }

    return (
        <>
            {/* 2D */}

            {elements2D.map(
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
                },
            )}

            {/* 3D */}

            {elements3D.length > 0 && (
                <Scene3DLayer
                    elements={elements3D}
                    context={context}
                />
            )}
        </>
    );
}