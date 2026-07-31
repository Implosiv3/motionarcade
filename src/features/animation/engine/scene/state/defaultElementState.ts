import type { ElementState } from "./ElementState";


export const defaultElementState: ElementState = {
    transform:{
        position:{
            x: 0,
            y: 0
        },
        offset:{
            x: 0,
            y: 0
        },
        scale: 1,
        rotation: 0,
        opacity: 1,
    },

    layout: {
        anchor:{
            x: 0,
            y: 0
        }
    },

    properties: {}
};