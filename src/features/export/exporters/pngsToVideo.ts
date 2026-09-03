import { waitAnimationRender } from "../../../utils/animation";
import { useAnimationStore } from "../../animation/store/animationStore";
import { getFfmpeg } from "../../../utils/ffmpeg";
import type { AudioClip } from "../types/AudioClip";

type ExportVideoParams = {
    outputFilename: string;
    exportPngFunction: ExportPngFn;
    audio?: AudioClip[];
};

/**
 * Export the animation as a video, using all the
 * frames that the animation store has defined.
 */
export async function exportPngsToVideo({
    outputFilename = "animation.mov",
    exportPngFunction,
    audio = [],
}: ExportVideoParams) {
    const ffmpeg = await getFfmpeg();

    const {
        totalFrames,
        fps,
        setFrame,
    } = useAnimationStore.getState();

    /*
     * Write audio files to FFmpeg first.
     */
    for (let i = 0; i < audio.length; i++) {
        const clip = audio[i];

        const response = await fetch(clip.src);

        if (!response.ok) {
            throw new Error(
                `Could not load audio: ${clip.src}`
            );
        }

        const bytes = new Uint8Array(
            await response.arrayBuffer()
        );

        const filename = `audio${i}.mp3`;

        await ffmpeg.writeFile(
            filename,
            bytes
        );
    }

    /*
     * We will obtain the bounding box that includes
     * the non-transparent content of all the frames
     * by getting the maximum bounding box corner
     * pixels coordinates.
     */
    const doTrimToBoundingBox = false;

    let globalMinX = Infinity;
    let globalMinY = Infinity;
    let globalMaxX = -Infinity;
    let globalMaxY = -Infinity;

    /*
     * Render every frame.
     */
    for (
        let frame = 0;
        frame < totalFrames;
        frame++
    ) {
        setFrame(frame);

        await waitAnimationRender();

        const png = await exportPngFunction({
            pixelRatio: 1.0,
            doTrimToBoundingBox: false,
        });

        const bytes = Uint8Array.from(
            atob(png),
            (c) => c.charCodeAt(0)
        );

        if (doTrimToBoundingBox) {
            const bounds =
                await getPngBounds(png);

            globalMinX = Math.min(
                globalMinX,
                bounds.minX
            );

            globalMinY = Math.min(
                globalMinY,
                bounds.minY
            );

            globalMaxX = Math.max(
                globalMaxX,
                bounds.maxX
            );

            globalMaxY = Math.max(
                globalMaxY,
                bounds.maxY
            );
        }

        await ffmpeg.writeFile(
            `frame${String(frame).padStart(5, "0")}.png`,
            bytes
        );
    }

    let tmp_filename = outputFilename;

    if (doTrimToBoundingBox) {
        tmp_filename = "temp.mov";
    }

    /*
     * Build FFmpeg inputs.
     */
    const args = [
        "-y",

        "-framerate",
        String(fps),

        "-i",
        "frame%05d.png",
    ];

    /*
     * Add audio inputs.
     */
    for (let i = 0; i < audio.length; i++) {
        args.push(
            "-i",
            `audio${i}.mp3`
        );
    }

    /*
     * Audio filters.
     */
    if (audio.length > 0) {
        const filters: string[] = [];

        for (let i = 0; i < audio.length; i++) {
            const clip = audio[i];

            const startMs =
                Math.round(
                    (clip.startFrame / fps) * 1000
                );

            let filter =
                `[${i + 1}:a]`;

            if (
                clip.endFrame !== undefined
            ) {
                const duration =
                    (
                        clip.endFrame -
                        clip.startFrame
                    ) / fps;

                filter +=
                    `atrim=duration=${duration},`;
            }

            filter +=
                `adelay=${startMs}|${startMs}`;

            if (
                clip.volume !== undefined
            ) {
                filter +=
                    `,volume=${clip.volume}`;
            }

            filter += `[audio${i}]`;

            filters.push(filter);
        }

        const inputs = audio
            .map(
                (_, i) => `[audio${i}]`
            )
            .join("");

        filters.push(
            `${inputs}amix=inputs=${audio.length}:duration=longest:dropout_transition=0[aout]`
        );

        args.push(
            "-filter_complex",
            filters.join(";"),

            "-map",
            "0:v",

            "-map",
            "[aout]"
        );
    } else {
        args.push(
            "-map",
            "0:v"
        );
    }

    /*
     * Video encoding.
     */
    args.push(
        "-vf",
        "premultiply=inplace=1",

        "-c:v",
        "prores_ks",

        "-profile:v",
        "4444",

        "-pix_fmt",
        "yuva444p10le"
    );

    /*
     * Audio encoding.
     */
    if (audio.length > 0) {
        args.push(
            "-c:a",
            "aac",
            "-b:a",
            "192k",
            "-shortest"
        );
    }

    args.push(
        tmp_filename
    );

    /*
    We render the images with straight alpha, so
    we need to premultiply it when creating the
    video to be correctly handled by the editors.
    Thats why we have 'premultiply=inplace=1'.
    */
    await ffmpeg.exec(args);

    if (doTrimToBoundingBox) {
        const cropWidth =
            globalMaxX -
            globalMinX +
            1;

        const cropHeight =
            globalMaxY -
            globalMinY +
            1;

        const evenWidth =
            cropWidth -
            (cropWidth % 2);

        const evenHeight =
            cropHeight -
            (cropHeight % 2);

        if (
            !Number.isFinite(globalMinX) ||
            !Number.isFinite(globalMinY) ||
            !Number.isFinite(globalMaxX) ||
            !Number.isFinite(globalMaxY)
        ) {
            throw new Error(
                "No visible pixels found."
            );
        }

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
    }

    const data =
        await ffmpeg.readFile(
            outputFilename
        );

    const blob =
        new Blob(
            [data as Uint8Array],
            {
                type: "video/quicktime",
            }
        );

    const url =
        URL.createObjectURL(blob);

    const a =
        document.createElement("a");

    a.href = url;
    a.download = tmp_filename;
    a.click();

    URL.revokeObjectURL(url);
}


async function getPngBounds(
    base64: string
) {
    const img =
        await new Promise<HTMLImageElement>(
            (resolve) => {
                const image =
                    new Image();

                image.onload =
                    () => resolve(image);

                image.src =
                    "data:image/png;base64," +
                    base64;
            }
        );

    const canvas =
        document.createElement("canvas");

    canvas.width =
        img.width;

    canvas.height =
        img.height;

    const ctx =
        canvas.getContext("2d")!;

    ctx.drawImage(
        img,
        0,
        0
    );

    const {
        data,
        width,
        height,
    } =
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

    for (
        let y = 0;
        y < height;
        y++
    ) {
        for (
            let x = 0;
            x < width;
            x++
        ) {
            const alpha =
                data[
                    (y * width + x) * 4 + 3
                ];

            if (alpha < 10) continue;

            minX =
                Math.min(minX, x);

            minY =
                Math.min(minY, y);

            maxX =
                Math.max(maxX, x);

            maxY =
                Math.max(maxY, y);
        }
    }

    return {
        minX,
        minY,
        maxX,
        maxY,
    };
}