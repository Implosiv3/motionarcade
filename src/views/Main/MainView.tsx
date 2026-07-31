import PopMessage from "../../components/resources/2d/general/PopMessage_old";
// import Canvas from "../../components/Canvas/Canvas_old";
import { testScene } from "../../features/animation/engine/scene/scenes/test";
import Canvas from "../../components/Canvas/Canvas";
// import { VoxelSprite3D } from "../../components/resources/3d/general/VoxelSprite3D";
// import StarsRating from "../../components/resources/2d/rating/stars/StarsRating";
// import WhatsAppMessage from "../../components/resources/2d/whatsapp/WhatsAppMessage";

export default function MainView() {
  /*
  We need to set '2d' or '3d' depending on
  the component we will put inside.
  */
  return (
    <Canvas
      scene={testScene}
    />

    // <Canvas>
    //   {/* <VoxelSprite3D
    //     imageUrl="/favicon.svg"
    //   /> */}
    //   {/* <PopMessage
    //     text="AI is amazing"
    //   /> */}
    //   {/* <StarsRating
    //     rating={4}
    //   /> */}
    //   {/* <WhatsAppMessage
    //     text="holaaa"
    //     time="08:33"
    //     direction="sent"
    //     checkStatus="sent"
    //   /> */}
    // </Canvas>
  );
}