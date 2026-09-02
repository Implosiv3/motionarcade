export type ComponentRenderer = "2d" | "3d";

export type ComponentDefinition = {
    component: React.ComponentType<any>;
    renderer: ComponentRenderer;
};

export const componentRegistry = new Map<
    string,
    ComponentDefinition
>();