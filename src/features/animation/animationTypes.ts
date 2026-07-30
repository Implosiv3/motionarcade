export type AnimationType = keyof AnimationProps;

export type ComponentAnimation<T extends AnimationType = AnimationType> = {
    type: T;

    startFrame: number;
    endFrame: number;

    props?: AnimationProps[T];
};

type AnimationProps = {
    pulse: {
        scale?: number;
        ease?: string;
    };

    shake: {
        amplitude?: number;
        shakes?: number;
        ease?: string;
    };

    fadeIn: {
        ease?: string;
    };

    fadeOut: {
        ease?: string;
    };

    bounce: {
        ease?: string;
    };

    zoomIn: {
        fromScale?: number;
        toScale?: number;
        ease?: string;
    };

    zoomOut: {
        fromScale?: number;
        toScale?: number;
        ease?: string;
    }

    slideUp: {
        distance?: number;
        ease?: string;
    };

    slideDown: {
        distance?: number;
        ease?: string;
    };

    slideLeft: {
        distance?: number;
        ease?: string;
    };

    slideRight: {
        distance?: number;
        ease?: string;
    };
};