export function lerp(
    from: number,
    to: number,
    amount: number
) {
    return from + (to - from) * amount;
}