export type EasingType =
    | "linear"

    | "easeIn"
    | "easeOut"
    | "easeInOut"

    | "easeInSine"
    | "easeOutSine"
    | "easeInOutSine"

    | "easeInQuad"
    | "easeOutQuad"
    | "easeInOutQuad"

    | "easeInCubic"
    | "easeOutCubic"
    | "easeInOutCubic"

    | "easeInQuart"
    | "easeOutQuart"
    | "easeInOutQuart"

    | "easeInQuint"
    | "easeOutQuint"
    | "easeInOutQuint"

    | "easeInExpo"
    | "easeOutExpo"
    | "easeInOutExpo"

    | "easeInCirc"
    | "easeOutCirc"
    | "easeInOutCirc"

    | "easeInBack"
    | "easeOutBack"
    | "easeInOutBack"

    | "easeInElastic"
    | "easeOutElastic"
    | "easeInOutElastic"

    | "easeInBounce"
    | "easeOutBounce"
    | "easeInOutBounce";


export function applyEasing(
    progress: number,
    easing: EasingType = "linear"
): number {

    switch(easing){

        case "easeIn":
        case "easeInQuad":
            return (
                progress *
                progress
            );


        case "easeOut":
        case "easeOutQuad":
            return (
                1 -
                Math.pow(
                    1 - progress,
                    2
                )
            );


        case "easeInOut":
        case "easeInOutQuad":
            return progress < 0.5
                ?
                (
                    2 *
                    progress *
                    progress
                )
                :
                (
                    1 -
                    Math.pow(
                        -2 * progress + 2,
                        2
                    ) /
                    2
                );


        case "easeInSine":
            return (
                1 -
                Math.cos(
                    (progress * Math.PI) /
                    2
                )
            );


        case "easeOutSine":
            return Math.sin(
                (progress * Math.PI) /
                2
            );


        case "easeInOutSine":
            return (
                -(
                    Math.cos(
                        Math.PI *
                        progress
                    ) -
                    1
                ) /
                2
            );


        case "easeInCubic":
            return Math.pow(
                progress,
                3
            );


        case "easeOutCubic":
            return (
                1 -
                Math.pow(
                    1 - progress,
                    3
                )
            );


        case "easeInOutCubic":
            return progress < 0.5
                ?
                (
                    4 *
                    Math.pow(
                        progress,
                        3
                    )
                )
                :
                (
                    1 -
                    Math.pow(
                        -2 * progress + 2,
                        3
                    ) /
                    2
                );


        case "easeInQuart":
            return Math.pow(
                progress,
                4
            );


        case "easeOutQuart":
            return (
                1 -
                Math.pow(
                    1 - progress,
                    4
                )
            );


        case "easeInOutQuart":
            return progress < 0.5
                ?
                (
                    8 *
                    Math.pow(
                        progress,
                        4
                    )
                )
                :
                (
                    1 -
                    Math.pow(
                        -2 * progress + 2,
                        4
                    ) /
                    2
                );


        case "easeInQuint":
            return Math.pow(
                progress,
                5
            );


        case "easeOutQuint":
            return (
                1 -
                Math.pow(
                    1 - progress,
                    5
                )
            );


        case "easeInOutQuint":
            return progress < 0.5
                ?
                (
                    16 *
                    Math.pow(
                        progress,
                        5
                    )
                )
                :
                (
                    1 -
                    Math.pow(
                        -2 * progress + 2,
                        5
                    ) /
                    2
                );


        case "easeInExpo":
            return progress === 0
                ? 0
                :
                Math.pow(
                    2,
                    10 * progress - 10
                );


        case "easeOutExpo":
            return progress === 1
                ? 1
                :
                (
                    1 -
                    Math.pow(
                        2,
                        -10 * progress
                    )
                );


        case "easeInOutExpo":
            if(progress === 0){
                return 0;
            }

            if(progress === 1){
                return 1;
            }

            return progress < 0.5
                ?
                Math.pow(
                    2,
                    20 * progress - 10
                ) /
                2
                :
                (
                    2 -
                    Math.pow(
                        2,
                        -20 * progress + 10
                    )
                ) /
                2;


        case "easeInCirc":
            return (
                1 -
                Math.sqrt(
                    1 -
                    Math.pow(
                        progress,
                        2
                    )
                )
            );


        case "easeOutCirc":
            return Math.sqrt(
                1 -
                Math.pow(
                    progress - 1,
                    2
                )
            );


        case "easeInOutCirc":
            return progress < 0.5
                ?
                (
                    1 -
                    Math.sqrt(
                        1 -
                        Math.pow(
                            2 * progress,
                            2
                        )
                    )
                ) /
                2
                :
                (
                    Math.sqrt(
                        1 -
                        Math.pow(
                            -2 * progress + 2,
                            2
                        )
                    ) +
                    1
                ) /
                2;


        case "easeInBack": {
            const c1 = 1.70158;
            const c3 = c1 + 1;

            return (
                c3 *
                progress *
                progress *
                progress
                -
                c1 *
                progress *
                progress
            );
        }


        case "easeOutBack": {
            const c1 = 1.70158;
            const c3 = c1 + 1;

            return (
                1 +
                c3 *
                Math.pow(
                    progress - 1,
                    3
                ) +
                c1 *
                Math.pow(
                    progress - 1,
                    2
                )
            );
        }


        case "easeInOutBack": {
            const c1 = 1.70158;
            const c2 = c1 * 1.525;

            return progress < 0.5
                ?
                (
                    Math.pow(
                        2 * progress,
                        2
                    ) *
                    (
                        (
                            c2 + 1
                        ) *
                        2 *
                        progress -
                        c2
                    )
                ) /
                2
                :
                (
                    Math.pow(
                        2 * progress - 2,
                        2
                    ) *
                    (
                        (
                            c2 + 1
                        ) *
                        (
                            progress * 2 - 2
                        ) +
                        c2
                    ) +
                    2
                ) /
                2;
        }


        case "easeInElastic": {
            const c4 =
                (
                    2 *
                    Math.PI
                ) /
                3;

            if(progress === 0){
                return 0;
            }

            if(progress === 1){
                return 1;
            }

            return -(
                Math.pow(
                    2,
                    10 * progress - 10
                ) *
                Math.sin(
                    (
                        progress * 10 -
                        10.75
                    ) *
                    c4
                )
            );
        }


        case "easeOutElastic": {
            const c4 =
                (
                    2 *
                    Math.PI
                ) /
                3;

            if(progress === 0){
                return 0;
            }

            if(progress === 1){
                return 1;
            }

            return (
                Math.pow(
                    2,
                    -10 * progress
                ) *
                Math.sin(
                    (
                        progress * 10 -
                        0.75
                    ) *
                    c4
                ) +
                1
            );
        }


        case "easeInOutElastic": {
            const c5 =
                (
                    2 *
                    Math.PI
                ) /
                4.5;

            if(progress === 0){
                return 0;
            }

            if(progress === 1){
                return 1;
            }

            return progress < 0.5
                ?
                -(
                    Math.pow(
                        2,
                        20 * progress - 10
                    ) *
                    Math.sin(
                        (
                            20 * progress -
                            11.125
                        ) *
                        c5
                    )
                ) /
                2
                :
                (
                    Math.pow(
                        2,
                        -20 * progress + 10
                    ) *
                    Math.sin(
                        (
                            20 * progress -
                            11.125
                        ) *
                        c5
                    )
                ) /
                2 +
                1;
        }


        case "easeOutBounce": {
            const n1 = 7.5625;
            const d1 = 2.75;

            if(progress < 1 / d1){
                return n1 *
                    progress *
                    progress;
            }

            if(progress < 2 / d1){
                const p =
                    progress -
                    1.5 / d1;

                return (
                    n1 *
                    p *
                    p +
                    0.75
                );
            }

            if(progress < 2.5 / d1){
                const p =
                    progress -
                    2.25 / d1;

                return (
                    n1 *
                    p *
                    p +
                    0.9375
                );
            }

            const p =
                progress -
                2.625 / d1;

            return (
                n1 *
                p *
                p +
                0.984375
            );
        }


        case "easeInBounce":
            return (
                1 -
                applyEasing(
                    1 - progress,
                    "easeOutBounce"
                )
            );


        case "easeInOutBounce":
            return progress < 0.5
                ?
                (
                    1 -
                    applyEasing(
                        1 - 2 * progress,
                        "easeOutBounce"
                    )
                ) /
                2
                :
                (
                    1 +
                    applyEasing(
                        2 * progress - 1,
                        "easeOutBounce"
                    )
                ) /
                2;


        case "linear":
        default:
            return progress;
    }
}