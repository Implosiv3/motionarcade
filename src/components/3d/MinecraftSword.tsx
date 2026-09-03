/*
An image that is turned into a VoxelSprite that
recreates the image by creating a lot of cubes.
*/
import { useRef } from "react";
import * as THREE from "three";

import { VoxelSprite } from "./basic/VoxelSprite";

type MinecraftSwordProps = {
  progress: number;
};

export function MinecraftSword({
    progress
}: MinecraftSwordProps) {
  const ref = useRef<THREE.Group>(null);

  return (
    <group
      ref={ref}
      rotation={[
        0,
        0.6 + 6.0 * progress,
        0,
      ]}
    >
      <VoxelSprite
        imageUrl="/minecraft-sword.png"
        voxelSize={0.01}
        depth={15}
      />
    </group>
  );
}