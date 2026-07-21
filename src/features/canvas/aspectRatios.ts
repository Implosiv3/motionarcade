import type { AspectRatio } from "./aspectRatio";


export const ASPECT_RATIOS: AspectRatio[] = [
  {
    id: "16:9",
    label: "16:9",
    // width: 16,
    // height: 9,
    width: 1920 / 4,
    height: 1080 / 4,
  },
  {
    id: "1:1",
    label: "1:1",
    // width: 1,
    // height: 1,
    width: ((1920 + 1080) / 2) / 4,
    height: ((1920 + 1080) / 2) / 4,
  },
  {
    id: "9:16",
    label: "9:16",
    // width: 9,
    // height: 16,
    width: 1080 / 4,
    height: 1920 / 4,
  },
];