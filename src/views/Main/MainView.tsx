import { testScene } from "../../features/animation/engine/scene/scenes/test";
import Canvas from "../../components/Canvas/Canvas";


export default function MainView() {
  return (
    <Canvas
      scene={testScene}
    />
  );
}