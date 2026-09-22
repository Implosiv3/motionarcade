// TODO: I don't think we are usign this
export function calculateProgress(
    currentFrame: number,
    startFrame: number,
    endFrame: number
) {
    if (endFrame <= startFrame)
        return 1;

    const progress = (currentFrame - startFrame) / (endFrame - startFrame);

    return Math.max(
        0,
        Math.min(
            1,
            progress
        )
    );
}