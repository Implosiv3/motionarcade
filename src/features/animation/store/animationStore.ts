import { create } from "zustand";

type AnimationState = {
  fps: number;
  duration: number;

  currentFrame: number;

  // Derivados
  currentTime: number;
  progress: number;
  totalFrames: number;

  configure: (
    fps: number,
    duration: number
  ) => void;

  setFrame: (
    frame: number
  ) => void;

  setTime: (
    time: number
  ) => void;

  getTotalFrames: () => number;
};

export const useAnimationStore =
  create<AnimationState>((set, get) => ({
    fps: 60,
    duration: 1,

    currentFrame: 0,

    currentTime: 0,
    progress: 0,
    totalFrames: 60,

    configure: (fps, duration) => {
      const safeFps = Math.max(1, fps);
      const safeDuration = Math.max(1 / safeFps, duration);
      const totalFrames = Math.max(1, Math.round(safeFps * safeDuration));
      const maxFrame = totalFrames - 1;

      set((state) => {
        const currentFrame = Math.min(state.currentFrame, maxFrame);
        const currentTime = currentFrame / safeFps;
        const progress = maxFrame <= 0 ? 1 : (currentFrame / maxFrame);

        return {
          fps: safeFps,
          duration: safeDuration,

          totalFrames,

          currentFrame,
          currentTime,
          progress,
        };
      });
    },

    setFrame: (frame) => {
      const { fps, totalFrames, } = get();

      const maxFrame = totalFrames - 1;
      const currentFrame = Math.max(0, Math.min(frame, maxFrame));
      const currentTime = currentFrame / fps;
      const progress = maxFrame <= 0 ? 1 : (currentFrame / maxFrame);

      set({
        currentFrame,
        currentTime,
        progress,
      });
    },

    setTime: (time) => {
      const { fps, } = get();

      const frame = Math.round(time * fps);

      get().setFrame(frame);
    },

    getTotalFrames: () => get().totalFrames,
  }));