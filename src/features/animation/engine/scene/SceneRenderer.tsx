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
    
    return (
        <>
            {elements.map((element) => {
                const state = resolveElementState(
                    element,
                    context,
                );

                console.log(
                    "ELEMENT",
                    element.id,
                    "frame:",
                    context.frame,
                    "life:",
                    element.startFrame,
                    element.endFrame,
                    "alive:",
                    context.frame >= element.startFrame &&
                    context.frame < element.endFrame,
                );

                if (!isElementAlive(element, context.frame)) {
                    return null;
                }

                if (state.transform.visible === false) {
                    return null;
                }

                const animationState =
                    resolveElementAnimationState(
                        element,
                        context,
                    );

                // /*
                //  * Group
                //  */
                // if (
                //     element.children &&
                //     element.children.length
                // ) {
                //     return (
                //         <AnimationElementProvider
                //             key={element.id}
                //             value={animationState}
                //         >
                //             <SceneNode
                //                 state={state}
                //             >
                //                 <SceneRenderer
                //                     elements={element.children}
                //                     context={context}
                //                 />
                //             </SceneNode>
                //         </AnimationElementProvider>
                //     );
                // }

                /*
                 * Single component
                 */
                const Component = componentRegistry.get(
                    element.type,
                );

                if (!Component) {
                    return null;
                }

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