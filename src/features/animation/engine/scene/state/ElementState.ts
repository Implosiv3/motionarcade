import type { ElementLayout } from "../ElementLayout";
import type { ElementProperties } from "../ElementProperties";
import type { ElementTransform } from "../ElementTransform";


export type ElementState = {
    transform: ElementTransform;
    layout: ElementLayout;
    properties: ElementProperties;
};