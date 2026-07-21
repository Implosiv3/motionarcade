import { create } from "zustand";
import { type AspectRatio } from "../features/canvas/aspectRatio";
import { ASPECT_RATIOS } from "../features/canvas/aspectRatios";
import type { ExportQuality } from "../features/canvas/exportQuality";
import { EXPORT_QUALITIES } from "../features/canvas/exportQualities";


type CanvasState = {
  canvas: {
    aspectRatio: AspectRatio;
    mode: string;
    exportQuality: ExportQuality;
  };

  setAspectRatio: (ratio: AspectRatio) => void;
  setMode: (mode: string) => void;
  setExportQuality: (quality: ExportQuality) => void;
};

export const useCanvasStore = create<CanvasState>((set) => ({
  canvas: {
    aspectRatio: ASPECT_RATIOS[0],
    mode: 'light',
    exportQuality: EXPORT_QUALITIES[2],
  },

  setAspectRatio: (ratio) =>
    set((state) => ({
      canvas: {
        ...state.canvas,
        aspectRatio: ratio,
      },
    })),

  setMode: (mode) =>
    set((state) => ({
      canvas: {
        ...state.canvas,
        mode: mode
      },
    })),

  setExportQuality: (quality) =>
    set((state) => ({
      canvas: {
        ...state.canvas,
        exportQuality: quality
      },
    })),
}));