import Canvas from "../../components/Canvas/Canvas";
import { quizScene } from "../../features/animation/engine/scene/scenes/quizScene";


export default function MainView() {
  return (
    <Canvas
      scene={quizScene}
    />
  );
}