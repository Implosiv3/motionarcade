/**
 * Trim the png image provided to the non-transparent
 * pixels. This allows us to get the resource as small
 * as possible, removing the extra alpha pixels outside.
 * @param dataUrl 
 * @returns 
 */
export async function trimTransparentPng(
    dataUrl: string
): Promise<string> {
    const img = await new Promise<HTMLImageElement>(
        (resolve) => {
            const image = new Image();
            image.onload = () => resolve(image);
            image.src = dataUrl;
        }
    );

    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
    );

    const { data, width, height } = imageData;

    let minX = width;
    let minY = height;
    let maxX = -1;
    let maxY = -1;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const alpha = data[(y * width + x) * 4 + 3];

            /*
                This can be adjusted to accept more or less 
                soft-transparent pixels, depending on the
                characteristics of what we are rendering.
            */
            if (alpha < 5) continue;
            //   if (alpha === 0) continue;

            minX = Math.min(minX, x);
            minY = Math.min(minY, y);

            maxX = Math.max(maxX, x);
            maxY = Math.max(maxY, y);
        }
    }

    if (maxX < minX || maxY < minY) {
        return dataUrl;
    }

    const trimmedWidth = maxX - minX + 1;
    const trimmedHeight = maxY - minY + 1;
    const trimmedCanvas = document.createElement("canvas");

    trimmedCanvas.width = trimmedWidth;
    trimmedCanvas.height = trimmedHeight;

    const trimmedCtx = trimmedCanvas.getContext("2d")!;

    trimmedCtx.drawImage(
        canvas,
        minX,
        minY,
        trimmedWidth,
        trimmedHeight,
        0,
        0,
        trimmedWidth,
        trimmedHeight
    );

    return trimmedCanvas.toDataURL(
        "image/png"
    );
}