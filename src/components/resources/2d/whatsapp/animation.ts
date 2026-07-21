export function getVisibleText(
    text: string,
    animation: Animation,
    time: number,
) {
    if (
        animation.type === "none"
    ) {
        return text;
    }

    const progress =
        Math.min(
            1,
            time /
            animation.duration
        );

    const count =
        Math.floor(
            progress *
            text.length
        );

    return text.slice(
        0,
        count
    );
}