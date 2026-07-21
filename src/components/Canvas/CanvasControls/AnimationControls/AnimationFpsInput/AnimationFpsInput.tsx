import { useAnimationStore } from "../../../../../features/animation/store/animationStore";
import EditableField from "../../../../Field/EditableField";
import "./AnimationFpsInput.scss"


export default function AnimationFpsInput() {
  // const fps = useAnimationStore(s => s.fps);
  // const duration = useAnimationStore(s => s.duration);
  // const configure = useAnimationStore(s => s.configure);

  const {
        fps,
        duration,
        // currentFrame,
        // totalFrames,
        configure,
        // setFrame,
    } = useAnimationStore();

  return (
    <EditableField
      label="FPS"
      name="fps"
      type="number"
      step={1}
      value={String(fps)}
      onChange={(v) =>
          configure(
              Number(v),
              duration
          )
      }
    />
  );
}