export const entranceAnimations = {

    fadeIn(
        tl: gsap.core.Timeline,
        target: Element
    ) {
        tl.fromTo(
            target,
            {
                opacity: 0
            },
            {
                opacity: 1,
                duration: 0.5
            }
        );
    },


    slideUp(
        tl: gsap.core.Timeline,
        target: Element
    ) {
        tl.fromTo(
            target,
            {
                opacity: 0,
                y: 50
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: "power3.out"
            }
        );
    },


    slideDown(
        tl: gsap.core.Timeline,
        target: Element
    ) {
        tl.fromTo(
            target,
            {
                opacity: 0,
                y: -50
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: "power3.out"
            }
        );
    },


    pop(
        tl: gsap.core.Timeline,
        target: Element
    ) {
        tl.fromTo(
            target,
            {
                opacity: 0,
                scale: 0
            },
            {
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: "back.out(1.7)"
            }
        );
    },


    zoomIn(
        tl: gsap.core.Timeline,
        target: Element
    ) {
        tl.fromTo(
            target,
            {
                opacity: 0,
                scale: 1.4
            },
            {
                opacity: 1,
                scale: 1,
                duration: 0.6,
                ease: "power2.out"
            }
        );
    }

};