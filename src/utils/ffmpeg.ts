import { FFmpeg } from "@ffmpeg/ffmpeg";


let ffmpegInstance: FFmpeg | null = null;
let loadingPromise: Promise<FFmpeg> | null = null;

/**
 * Load a Ffmpeg instance or get the previously
 * loaded one.
 * @returns 
 */
export async function getFfmpeg() {
  if (ffmpegInstance) {
    return ffmpegInstance;
  }

  if (loadingPromise) {
    return loadingPromise;
  }

  loadingPromise = (async () => {
    const ffmpeg = new FFmpeg();

    await ffmpeg.load();

    ffmpegInstance = ffmpeg;

    return ffmpeg;
  })();

  return loadingPromise;
}