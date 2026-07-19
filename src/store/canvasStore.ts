import { create } from "zustand";
import { type AspectRatio } from "../features/canvas/aspectRatio";
import { ASPECT_RATIOS } from "../features/canvas/aspectRatios";


type CanvasState = {
  canvas: {
    aspectRatio: AspectRatio;
    mode: string;
  };

  setAspectRatio: (ratio: AspectRatio) => void;
  setMode: (mode: string) => void;
};

export const useCanvasStore = create<CanvasState>((set) => ({
  canvas: {
    aspectRatio: ASPECT_RATIOS[0],
    mode: 'light',
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
}));