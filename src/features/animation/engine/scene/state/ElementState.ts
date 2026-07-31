import type { ElementProperties } from "../ElementProperties";
import type { ElementTransform } from "../ElementTransform";


export type ElementState = {
    transform: ElementTransform;
    properties: ElementProperties;
};