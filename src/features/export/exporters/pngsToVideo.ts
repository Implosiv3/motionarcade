import { waitAnimationRender } from "../../../utils/animation";
import { useAnimationStore } from "../../animation/store/animationStore";
import { getFfmpeg } from "../../../utils/ffmpeg";
import type { AudioClip } from "../types/AudioClip";

type ExportVideoParams = {
    outputFilename: string;
    exportPngFunction: ExportPngFn;
    audio?: AudioClip[];
};

export async function exportPngsToVideo({
    outputFilename = "animation.mov",
    exportPngFunction,
    audio = [],
}: ExportVideoParams) {
    const ffmpeg = await getFfmpeg();

    const { totalFrames, fps, setFrame } = useAnimationStore.getState();

    const videoDuration = totalFrames / fps;

    for (let i = 0; i < audio.length; i++) {
        const clip = audio[i];

        const response = await fetch(clip.src);

        if (!response.ok) {
            throw new Error(`Could not load audio: ${clip.src}`);
        }

        const bytes = new Uint8Array(await response.arrayBuffer());

        const filename = `audio${i}.mp3`;

        await ffmpeg.writeFile(filename, bytes);
    }

    const doTrimToBoundingBox = false;

    let globalMinX = Infinity;
    let globalMinY = Infinity;
    let globalMaxX = -Infinity;
    let globalMaxY = -Infinity;

    let totalRenderTime = 0;
    let totalWriteTime = 0;

    for (let frame = 0; frame < totalFrames; frame++) {
        setFrame(frame);

        await waitAnimationRender();

        const renderStart = performance.now();

        const bytes = await exportPngFunction({
            pixelRatio: 1.0,
            doTrimToBoundingBox: false,
        });

        const renderTime = performance.now() - renderStart;

        totalRenderTime += renderTime;

        if (doTrimToBoundingBox) {
            const bounds = await getPngBounds(bytes);

            globalMinX = Math.min(globalMinX, bounds.minX);
            globalMinY = Math.min(globalMinY, bounds.minY);
            globalMaxX = Math.max(globalMaxX, bounds.maxX);
            globalMaxY = Math.max(globalMaxY, bounds.maxY);
        }

        const writeStart = performance.now();

        await ffmpeg.writeFile(
            `frame${String(frame).padStart(5, "0")}.png`,
            bytes,
        );

        const writeTime = performance.now() - writeStart;

        totalWriteTime += writeTime;

        if (frame % 10 === 0 || frame === totalFrames - 1) {
            console.log(
                `[Export] Frame ${frame + 1}/${totalFrames} | ` +
                    `render: ${renderTime.toFixed(1)} ms | ` +
                    `write: ${writeTime.toFixed(1)} ms`,
            );
        }
    }

    console.log(
        `[Export] Frame rendering total: ${totalRenderTime.toFixed(1)} ms`,
    );

    console.log(
        `[Export] Frame rendering average: ` +
            `${(totalRenderTime / totalFrames).toFixed(1)} ms`,
    );

    console.log(`[Export] FFmpeg write total: ${totalWriteTime.toFixed(1)} ms`);

    console.log(
        `[Export] FFmpeg write average: ` +
            `${(totalWriteTime / totalFrames).toFixed(1)} ms`,
    );

    let tmp_filename = outputFilename;

    if (doTrimToBoundingBox) {
        tmp_filename = "temp.mov";
    }

    const args = ["-y", "-framerate", String(fps), "-i", "frame%05d.png"];

    for (let i = 0; i < audio.length; i++) {
        args.push("-i", `audio${i}.mp3`);
    }

    if (audio.length > 0) {
        const filters: string[] = [];

        for (let i = 0; i < audio.length; i++) {
            const clip = audio[i];

            const startMs = Math.round((clip.startFrame / fps) * 1000);

            let filter = `[${i + 1}:a]`;

            if (clip.endFrame !== undefined) {
                const maxDuration = (clip.endFrame - clip.startFrame) / fps;

                filter += `areverse,atrim=end=${maxDuration},areverse,`;
            }

            if (clip.volume !== undefined) {
                filter += `volume=${clip.volume},`;
            }

            filter += `adelay=${startMs}|${startMs}`;

            filter += `[audio${i}]`;

            filters.push(filter);
        }

        const inputs = audio.map((_, i) => `[audio${i}]`).join("");

        filters.push(
            `${inputs}amix=inputs=${audio.length}:duration=longest:dropout_transition=0[aout]`,
        );

        args.push(
            "-filter_complex",
            filters.join(";"),
            "-map",
            "0:v",
            "-map",
            "[aout]",
        );
    } else {
        args.push("-map", "0:v");
    }

    /*
    This configuration will preserve the alpha
    channel but last 3x or 4x the time that it
    is needed to be rendered without the alpha.

    For a video that has 60 frames, it takes 17
    seconds to generate it with alpha (and it
    its' weight is 32MB), but takes only 5s to
    generate it without alpha (and the weight
    is 2MB only).
    */
    const DO_EXPORT_ALPHA = true;

    if (DO_EXPORT_ALPHA) {
        args.push(
            "-vf",
            "premultiply=inplace=1",
            "-c:v",
            "prores_aw",
            "-pix_fmt",
            "yuva444p10le",
        );
    } else {
        args.push(
            "-c:v",
            "libx264",
            "-preset",
            "ultrafast",
            "-crf",
            "18",
            "-pix_fmt",
            "yuv420p",
        );
    }

    if (audio.length > 0) {
        args.push("-c:a", "aac", "-b:a", "192k");
    }

    args.push("-t", String(videoDuration), tmp_filename);

    console.log("[Export] Starting FFmpeg encoding...");

    const ffmpegStart = performance.now();

    await ffmpeg.exec(args);

    const ffmpegTime = performance.now() - ffmpegStart;

    console.log(`[Export] FFmpeg encoding: ` + `${ffmpegTime.toFixed(1)} ms`);

    if (doTrimToBoundingBox) {
        const cropWidth = globalMaxX - globalMinX + 1;
        const cropHeight = globalMaxY - globalMinY + 1;
        const evenWidth = cropWidth - (cropWidth % 2);
        const evenHeight = cropHeight - (cropHeight % 2);

        if (
            !Number.isFinite(globalMinX) ||
            !Number.isFinite(globalMinY) ||
            !Number.isFinite(globalMaxX) ||
            !Number.isFinite(globalMaxY)
        ) {
            throw new Error("No visible pixels found.");
        }

        await ffmpeg.exec([
            "-y",
            "-i",
            tmp_filename,
            "-vf",
            `crop=${evenWidth}:${evenHeight}:${globalMinX}:${globalMinY}`,
            "-c:v",
            "prores_aw",
            "-pix_fmt",
            "yuva444p10le",
            "-map",
            "0:v",
            "-map",
            "0:a?",
            "-c:a",
            "copy",
            outputFilename,
        ]);
    }

    const data = await ffmpeg.readFile(outputFilename);

    const blob = new Blob([data as Uint8Array], {
        type: "video/quicktime",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = tmp_filename;

    a.click();

    URL.revokeObjectURL(url);
}

async function getPngBounds(bytes: Uint8Array) {
    const blob = new Blob([bytes], {
        type: "image/png",
    });

    const image = await createImageBitmap(blob);

    const canvas = document.createElement("canvas");

    canvas.width = image.width;
    canvas.height = image.height;

    const ctx = canvas.getContext("2d")!;

    ctx.drawImage(image, 0, 0);

    image.close();

    const { data, width, height } = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height,
    );

    let minX = width;
    let minY = height;
    let maxX = -1;
    let maxY = -1;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const alpha = data[(y * width + x) * 4 + 3];

            if (alpha < 10) {
                continue;
            }

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