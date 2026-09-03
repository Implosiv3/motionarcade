/*
A plain image that is rotating and using an
existing image for the texture.
*/
import { useAnimationElement } from "@implosiv3/fr8mer-components";
import TexturePlane from "./basic/TexturePlane";


export default function Like() {
  const { progress } =
        useAnimationElement();

  return (
    <TexturePlane
      texture="/instagramtooltip.png"
      width={4 * 3}
      height={1 * 3}
      rotation={[
        0,
        Math.sin(progress * Math.PI * 2) * 0.3,
        0,
      ]}
    />
  );
}