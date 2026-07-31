import SceneNode from "./SceneNode";
import SceneElement from "./SceneElement";

import {
    componentRegistry
} from "../components/componentRegistry";

import {
    resolveElementState
} from "./state/resolveElementState";

import type {
    SceneElementData
} from "./sceneTypes";

import type {
    RenderContext
} from "../renderer/RenderContext";


type SceneRendererProps = {
    elements: SceneElementData[];
    context: RenderContext;
};


export default function SceneRenderer({
    elements,
    context
}: SceneRendererProps) {
    return (
        <>
            {
                elements.map(
                    element => {
                        const state =
                            resolveElementState(
                                element,
                                context
                            );

                        if (
                            state.transform.visible === false
                        ) {
                            return null;
                        }

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
                                    state={state}
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
                        const Component =
                            componentRegistry.get(
                                element.type
                            );

                        if (!Component)
                            return null;

                        return (
                            <SceneNode
                                key={element.id}
                                state={state}
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