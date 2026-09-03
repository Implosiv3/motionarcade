export type ElementTransform = {
    position: {
        x: number;
        y: number;
    };

    offset: {
        x: number;
        y: number;
    };

    scale: {
        x: number;
        y: number;
    };

    rotation: number;

    rotation3d: {
        x: number;
        y: number;
        z: number;
    };

    opacity: number;

    visible: boolean;
};