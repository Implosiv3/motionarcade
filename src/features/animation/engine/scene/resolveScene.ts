import type {
    SceneConfig,
    SceneElementConfig,
    SceneConfigTrack,
    TemporalSpecification,
} from "./sceneConfigTypes";

import type {
    SceneData,
    SceneElementData,
} from "./sceneTypes";


/*
 * Temporal ranges use:
 *
 * [startFrame, endFrame)
 *
 * startFrame is included.
 * endFrame is excluded.
 *
 * For progress:
 *
 * 0   -> startFrame
 * 0.5 -> middle of the range
 * 1   -> endFrame
 *
 * Therefore progress=1 can resolve to the
 * excluded endFrame. This is intentional.
 */


function resolveTemporalSpecification(
    specification: TemporalSpecification | undefined,
    fps: number,
    totalFrames: number,
    context: string
): number {

    if (specification === undefined) {
        throw new Error(
            `Missing temporal specification at ${context}.`
        );
    }


    if (
        specification === null ||
        typeof specification !== "object"
    ) {
        throw new Error(
            `Invalid temporal specification at ${context}: ${JSON.stringify(specification)}`
        );
    }


    if (!("type" in specification)) {
        throw new Error(
            `Temporal specification has no "type" at ${context}: ${JSON.stringify(specification)}`
        );
    }


    if (!("value" in specification)) {
        throw new Error(
            `Temporal specification has no "value" at ${context}: ${JSON.stringify(specification)}`
        );
    }


    switch (specification.type) {

        case "frame":

            return Math.round(
                specification.value
            );


        case "time":

            return Math.round(
                specification.value * fps
            );


        case "progress": {

            if (
                specification.value < 0 ||
                specification.value > 1
            ) {
                throw new RangeError(
                    `Progress must be between 0 and 1 at ${context}. Received: ${specification.value}`
                );
            }


            return Math.round(
                specification.value * totalFrames
            );
        }


        default:

            throw new Error(
                `Unknown temporal specification type "${String(
                    specification.type
                )}" at ${context}.`
            );
    }
}


function resolveKeyframeFrame(
    specification: TemporalSpecification,
    fps: number,
    elementStartFrame: number,
    elementEndFrame: number,
    context: string
): number {

    if (
        specification === null ||
        typeof specification !== "object"
    ) {
        throw new Error(
            `Invalid keyframe temporal specification at ${context}: ${JSON.stringify(specification)}`
        );
    }


    switch (specification.type) {

        case "frame":

            return Math.round(
                specification.value
            );


        case "time":

            return (
                elementStartFrame +
                Math.round(
                    specification.value * fps
                )
            );


        case "progress": {

            if (
                specification.value < 0 ||
                specification.value > 1
            ) {
                throw new RangeError(
                    `Progress must be between 0 and 1 at ${context}. Received: ${specification.value}`
                );
            }


            const elementFrameCount =
                elementEndFrame -
                elementStartFrame;


            return (
                elementStartFrame +
                Math.round(
                    specification.value *
                    elementFrameCount
                )
            );
        }


        default:

            throw new Error(
                `Unknown keyframe temporal specification type "${String(
                    specification.type
                )}" at ${context}.`
            );
    }
}


function resolveTrack(
    track: SceneConfigTrack,
    fps: number,
    elementStartFrame: number,
    elementEndFrame: number,
    elementId: string
) {

    return {

        property:
            track.property,

        ...(track.type !== undefined
            ? {
                type:
                    track.type
            }
            : {}),

        ...(track.easing !== undefined
            ? {
                easing:
                    track.easing
            }
            : {}),

        keyframes:
            track.keyframes.map(
                (keyframe, index) => ({
                    frame:
                        resolveKeyframeFrame(
                            keyframe.time,
                            fps,
                            elementStartFrame,
                            elementEndFrame,
                            `element "${elementId}", track "${track.property}", keyframe ${index}`
                        ),

                    value:
                        keyframe.value,
                })
            ),
    };
}


function resolveElement(
    element: SceneElementConfig | undefined,
    fps: number,
    totalFrames: number
): SceneElementData {

    if (element === undefined) {
        throw new Error(
            "resolveElement() received an undefined element."
        );
    }


    const startFrame =
        resolveTemporalSpecification(
            element.start,
            fps,
            totalFrames,
            `element "${element.id}" start`
        );


    const endFrame =
        resolveTemporalSpecification(
            element.end,
            fps,
            totalFrames,
            `element "${element.id}" end`
        );


    if (
        startFrame < 0 ||
        endFrame < 0
    ) {
        throw new RangeError(
            `Element "${element.id}" has a negative frame range: [${startFrame}, ${endFrame})`
        );
    }


    if (
        startFrame > totalFrames ||
        endFrame > totalFrames
    ) {
        throw new RangeError(
            `Element "${element.id}" exceeds the scene frame range: [${startFrame}, ${endFrame}) / totalFrames=${totalFrames}`
        );
    }


    if (endFrame < startFrame) {
        throw new RangeError(
            `Element "${element.id}" has an invalid frame range: [${startFrame}, ${endFrame})`
        );
    }


    return {

        id:
            element.id,

        type:
            element.type,

        x:
            element.x,

        y:
            element.y,

        ...(element.width !== undefined
            ? {
                width:
                    element.width
            }
            : {}),

        ...(element.height !== undefined
            ? {
                height:
                    element.height
            }
            : {}),

        ...(element.anchor !== undefined
            ? {
                anchor:
                    element.anchor
            }
            : {}),

        startFrame,

        endFrame,

        ...(element.props !== undefined
            ? {
                props:
                    element.props
            }
            : {}),

        ...(element.tracks !== undefined
            ? {
                tracks:
                    element.tracks.map(
                        track =>
                            resolveTrack(
                                track,
                                fps,
                                startFrame,
                                endFrame,
                                element.id
                            )
                    )
            }
            : {}),

        ...(element.children !== undefined
            ? {
                children:
                    element.children.map(
                        child =>
                            resolveElement(
                                child,
                                fps,
                                totalFrames
                            )
                    )
            }
            : {}),
    };
}


export function resolveScene(
    scene: SceneConfig
): SceneData {

    const safeFps =
        Math.max(
            1,
            scene.fps
        );


    const totalFrames =
        Math.max(
            1,
            Math.round(
                scene.duration *
                safeFps
            )
        );


    const elements =
        scene.elements.map(
            (element, index) => {

                if (element === undefined) {
                    throw new Error(
                        `Scene contains an undefined element at index ${index}.`
                    );
                }


                return resolveElement(
                    element,
                    safeFps,
                    totalFrames
                );
            }
        );


    const audio =
        scene.audio.map(
            (clip, index) => {

                const startFrame =
                    resolveTemporalSpecification(
                        clip.start,
                        safeFps,
                        totalFrames,
                        `audio clip ${index} "${clip.src}" start`
                    );


                const endFrame =
                    resolveTemporalSpecification(
                        clip.end,
                        safeFps,
                        totalFrames,
                        `audio clip ${index} "${clip.src}" end`
                    );


                if (
                    startFrame < 0 ||
                    endFrame < 0
                ) {
                    throw new RangeError(
                        `Audio clip "${clip.src}" has a negative frame range: [${startFrame}, ${endFrame})`
                    );
                }


                if (
                    startFrame > totalFrames ||
                    endFrame > totalFrames
                ) {
                    throw new RangeError(
                        `Audio clip "${clip.src}" exceeds the scene frame range: [${startFrame}, ${endFrame}) / totalFrames=${totalFrames}`
                    );
                }


                if (endFrame < startFrame) {
                    throw new RangeError(
                        `Audio clip "${clip.src}" has an invalid frame range: [${startFrame}, ${endFrame})`
                    );
                }


                return {

                    src:
                        clip.src,

                    startFrame,

                    endFrame,

                    ...(clip.volume !== undefined
                        ? {
                            volume:
                                clip.volume
                        }
                        : {}),
                };
            }
        );


    return {

        width:
            scene.width,

        height:
            scene.height,

        fps:
            safeFps,

        totalFrames,

        elements,

        audio,
    };
}