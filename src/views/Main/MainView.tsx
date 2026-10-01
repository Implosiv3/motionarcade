import Canvas from "../../components/Canvas/Canvas";
import { testScene } from "../../features/animation/engine/scene/scenes/testWithAudio";


export default function MainView() {
  return (
    <Canvas
      scene={testScene}
    />
  );
}