import { useAnimationStore } from "../../../../../features/animation/store/animationStore";
import EditableField from "../../../../Field/EditableField";
import "./AnimationDurationInput.scss"


export default function AnimationDurationInput() {
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
        label="Duración"
        name="duration"
        type="number"
        step={0.1}
        value={duration}
        onChange={(v) =>
            configure(
                fps,
                Number(v)
            )
        }
    />
  );
}



