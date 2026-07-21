export const emphasisAnimations = {

    pulse(
        tl: gsap.core.Timeline,
        target: Element
    ) {
        tl.to(
            target,
            {
                scale: 1.1,
                duration: 0.25,
                ease: "power2.out"
            }
        )
        .to(
            target,
            {
                scale: 1,
                duration: 0.35,
                ease: "elastic.out"
            }
        );
    },


    shake(
        tl: gsap.core.Timeline,
        target: Element
    ) {
        tl.to(
            target,
            {
                x: -10,
                duration: 0.1
            }
        )
        .to(
            target,
            {
                x: 10,
                duration: 0.1
            }
        )
        .to(
            target,
            {
                x: 0,
                duration: 0.1
            }
        );
    }

};