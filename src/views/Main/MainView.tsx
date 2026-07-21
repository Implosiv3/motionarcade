import Canvas from "../../components/Canvas/Canvas";
import PopMessage from "../../components/resources/2d/general/PopMessage";
// import StarsRating from "../../components/resources/2d/rating/stars/StarsRating";
// import WhatsAppMessage from "../../components/resources/2d/whatsapp/WhatsAppMessage";

export default function MainView() {
  return (
    <Canvas aspectRatio={16/9}>
      <PopMessage
        text="AI is amazing"
      />
      {/* <StarsRating
        rating={4}
      /> */}
      {/* <WhatsAppMessage
        text="holaaa"
        time="08:33"
        direction="sent"
        checkStatus="sent"
      /> */}
    </Canvas>
  );
}