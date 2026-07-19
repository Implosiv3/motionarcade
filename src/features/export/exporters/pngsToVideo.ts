import { waitAnimationRender } from "../animation/utils";
import { useAnimationStore } from "../animation/AnimationStore"
import { getFfmpeg } from "../../../utils/ffmpeg";

// type ExportPngFn = (
//     doTrimToBoundingBox: boolean
// ) => Promise<string>;

type ExportVideoParams = {
    outputFilename: string;
    exportPngFunction: ExportPngFn;
};

/**
 * Export the animation as a video, using all the
 * frames that the animation store has defined.
 * @param param0 
 */
export async function exportPngsToVideo({
    outputFilename = "animation.mov",
    exportPngFunction
}: ExportVideoParams) {
    const ffmpeg = await getFfmpeg();
    const {
        totalFrames,
        fps,
        setFrame
    } = useAnimationStore.getState();

    // We will crop the result
    let globalMinX = Infinity;
    let globalMinY = Infinity;
    let globalMaxX = -Infinity;
    let globalMaxY = -Infinity;

    for (let frame = 0; frame < totalFrames; frame++) {
        setFrame(frame);
        await waitAnimationRender();

        const png = await exportPngFunction({
            doTrimToBoundingBox: false
        });
        const bytes = Uint8Array.from(atob(png), (c) => c.charCodeAt(0));

        const bounds = await getPngBounds(png);

        globalMinX = Math.min(globalMinX, bounds.minX);
        globalMinY = Math.min(globalMinY, bounds.minY);

        globalMaxX = Math.max(globalMaxX, bounds.maxX);
        globalMaxY = Math.max(globalMaxY, bounds.maxY);

        await ffmpeg.writeFile(`frame${String(frame).padStart(5, "0")}.png`, bytes);
    }

    const tmp_filename = "temp.mov"

    await ffmpeg.exec([
        "-y",
        "-framerate",
        String(fps),
        "-i",
        "frame%05d.png",
        "-c:v",
        "prores_ks",
        "-profile:v",
        "4444",
        "-pix_fmt",
        "yuva444p10le",
        tmp_filename,
    ]);

    const cropWidth = globalMaxX - globalMinX + 1;
    const cropHeight = globalMaxY - globalMinY + 1;
    const evenWidth = cropWidth - (cropWidth % 2);
    const evenHeight = cropHeight - (cropHeight % 2);

    await ffmpeg.exec([
        "-y",
        "-i",
        tmp_filename,
        "-vf",
        `crop=${evenWidth}:${evenHeight}:${globalMinX}:${globalMinY}`,
        "-c:v",
        "prores_ks",
        "-profile:v",
        "4444",
        "-pix_fmt",
        "yuva444p10le",
        outputFilename,
    ]);
    

    const data = await ffmpeg.readFile(outputFilename);
    const blob = new Blob([data as Uint8Array], { type: "video/quicktime" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = outputFilename;
    a.click();

    URL.revokeObjectURL(url);
}


async function getPngBounds(base64: string) {
    const img = await new Promise<HTMLImageElement>(
        (resolve) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.src =
            "data:image/png;base64," + base64;
        }
    );

    const canvas = document.createElement("canvas");

    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext("2d")!;

    ctx.drawImage(img, 0, 0);

    const { data, width, height } =
        ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
        );

    let minX = width;
    let minY = height;
    let maxX = -1;
    let maxY = -1;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
        const alpha =
            data[(y * width + x) * 4 + 3];

        if (alpha < 10) continue;

        minX = Math.min(minX, x);
        minY = Math.min(minY, y);

        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
        }
    }

    return {
        minX,
        minY,
        maxX,
        maxY,
    };
}