import type { ElementState } from "./ElementState";


export const defaultElementState: ElementState = {
    transform: {
        position: {
            x: 0,
            y: 0,
        },

        offset: {
            x: 0,
            y: 0,
        },

        scale: {
            x: 1,
            y: 1,
        },

        rotation: 0,

        rotation3d: {
            x: 0,
            y: 0,
            z: 0,
        },

        opacity: 1,

        visible: true,
    },

    // ...
};