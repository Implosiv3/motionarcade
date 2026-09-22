import type { ExportQuality } from "./exportQuality";


export const EXPORT_QUALITIES: ExportQuality[] = [
  // {
  //   // 720x480 in 16:9
  //   id: "sd",
  //   label: "480p",
  //   // Original canvas size
  //   scaleFactor: 1.0
  // },
  // {
  //   // 1080x720 in 16:9
  //   id: "hd",
  //   label: "720p",
  //   scaleFactor: 1.5
  // },
  {
    // 1920x1080 in 16:9
    id: "full_hd",
    label: "1080p",
    // scaleFactor: 4.0
    scaleFactor: 1.0
  },
  // { // 3840×2160 in 16:9
  //   id: "4k",
  //   label: "4K",
  //   scaleFactor: 8.0
  // }
];