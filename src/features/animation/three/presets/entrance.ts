import * as THREE from "three";


export const threeEntranceAnimations = {
    fadeIn(
        tl: gsap.core.Timeline,
        object: THREE.Object3D
    ) {
        object.scale.set(0, 0, 0);

        tl.to(
            object.scale,
            {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.8,
                ease: "back.out(1.7)"
            }
        );
    },

    popIn(
        tl: gsap.core.Timeline,
        object: THREE.Object3D
    ) {
        tl.fromTo(
            object.scale,
            {
                x: 0,
                y: 0,
                z: 0,
            },
            {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.8,
                ease: "elastic.out(1,0.5)"
            }
        );
    },

    rotateIn(
        tl: gsap.core.Timeline,
        object: THREE.Object3D
    ) {
        tl.fromTo(
            object.rotation,
            {
                y: -Math.PI,
            },
            {
                y: Math.PI,
                duration: 1,
                ease: "power3.out"
            }
        );
    }
};