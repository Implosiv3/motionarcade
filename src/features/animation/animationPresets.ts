import gsap from "gsap";


export type AnimationContext<T = Record<string, unknown>> = {
    progress: number;
    props: T;
};

type PulseProps = {
    scale?: number;
    ease?: string;
};

type ShakeProps = {
    ease?: string;
    amplitude?: number;
}

type FadeInProps = {
    ease?: string
}

type FadeOutProps = {
    ease?: string
}

type BounceProps = {
    ease?: string
}

// TODO: Maybe 1 per direction (?)
type SlideProps = {
    ease?: string,
    distance: number
}

type ZoomProps = {
    ease?: string,
    fromScale?: number;
    toScale?: number;
}


export const animations = {
    pulse({
        progress,
        props = {}
    }: AnimationContext<PulseProps>) {
        const eased_progress = gsap.parseEase(props.ease ?? "power2.out")(progress);
        const scale = 1 + Math.sin(eased_progress * Math.PI) * ((props.scale ?? 1.1) - 1)
        
        return {
            scale: scale
        };
    },
    shake({
        progress,
        props = {}
    }: AnimationContext<ShakeProps>) {
        const eased_progress = gsap.parseEase(props.ease ?? "power2.out")(progress);
        const value = Math.sin(eased_progress * Math.PI * (props.amplitude ?? 3));

        return {
            x: value * 10
        };
    },
    fadeIn({
        progress,
        props
    }: AnimationContext<FadeInProps>) {
        const eased_progress = gsap.parseEase(props.ease ?? "power2.out")(progress);

        return {
            opacity: eased_progress
        };
    },
    fadeOut({
        progress,
        props
    }: AnimationContext<FadeOutProps>) {
        const eased_progress = gsap.parseEase(props.ease ?? "power2.out")(progress);

        return {
            opacity: 1 - eased_progress
        };
    },
    bounce({
        progress,
        props
    }: AnimationContext<BounceProps>) {
        const eased_progress = gsap.parseEase(props.ease ?? "power2.out")(progress);

        return{
            y: -Math.abs(Math.sin(eased_progress * Math.PI * 2)) * 50
        };
    },
    zoomIn({
        progress,
        props
    }: AnimationContext<ZoomProps>) {
        const eased_progress = gsap.parseEase(props.ease ?? "power2.out")(progress);
        const fromScale = props.fromScale ?? 1.4;
        const toScale = props.toScale ?? 1.0;

        return {
            opacity: eased_progress,
            scale: fromScale + (toScale - fromScale) * eased_progress
        };
    },
    zoomOut({
        progress,
        props
    }: AnimationContext<ZoomProps>) {
        const eased_progress = gsap.parseEase(props.ease ?? "power2.out")(progress);
        const fromScale = props.fromScale ?? 1.0;
        const toScale = props.toScale ?? 1.4;

        return {
            opacity: 1 - eased_progress,
            scale: fromScale + (toScale - fromScale) * eased_progress
        };
    },
    slideUp({
        progress,
        props
    }: AnimationContext<SlideProps>) {
        const eased_progress = gsap.parseEase(props.ease ?? "power3.out")(progress);
        const distance = props.distance ?? 50;

        return {
            opacity: eased_progress,
            y: distance * (1 - eased_progress)
        };
    },
    slideDown({
        progress,
        props
    }: AnimationContext<SlideProps>) {
        const eased_progress = gsap.parseEase(props.ease ?? "power3.out")(progress);
        const distance = props.distance ?? 50;

        return {
            opacity: eased_progress,
            y: -distance * (1 - eased_progress)
        };
    },
    slideLeft({
        progress,
        props
    }: AnimationContext<SlideProps>) {
        const eased_progress = gsap.parseEase(props.ease ?? "power3.out")(progress);
        const distance = props.distance ?? 50;

        return{
            x: -distance * (1 - eased_progress)
        };
    },
    slideRight({
        progress,
        props
    }: AnimationContext<SlideProps>) {
        const eased_progress = gsap.parseEase(props.ease ?? "power3.out")(progress);
        const distance = props.distance ?? 50;

        return{
            x: distance * (1 - eased_progress)
        };
    },
}