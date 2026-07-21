import { useEffect } from "react";
import { useThree, type ThreeElements } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

type TexturePlaneProps = ThreeElements["mesh"] & {
  texture: string;
  width?: number;
  height?: number;
};

export default function TexturePlane({
    texture: textureUrl,
    width = 4,
    height = 4,
    ...meshProps
}: TexturePlaneProps) {
    const texture = useTexture(textureUrl);
    const { gl } = useThree();

    useEffect(() => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = gl.capabilities.getMaxAnisotropy();
        texture.generateMipmaps = true;
        texture.needsUpdate = true;
    }, [texture, gl]);

    return (
        <mesh {...meshProps}>
            <planeGeometry args={[width, height]} />

            <meshBasicMaterial
                map={texture}
                transparent
                opacity={1}
                alphaTest={0.1}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}