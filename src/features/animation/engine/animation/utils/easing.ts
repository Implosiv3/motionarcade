export type EasingType =
    | "linear"
    | "easeIn"
    | "easeOut"
    | "easeInOut";


export function applyEasing(
    progress: number,
    easing: EasingType = "linear"
) {
    switch(easing){
        case "easeIn":
            return (
                progress *
                progress
            );

        case "easeOut":
            return (
                1 -
                Math.pow(
                    1 - progress,
                    2
                )
            );

        case "easeInOut":
            return progress < 0.5
                ? (
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
                    )
                    /
                    2
                );

        case "linear":
        default:
            return progress;
    }
}