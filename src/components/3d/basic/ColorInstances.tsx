import { useLayoutEffect, useRef } from "react";
import * as THREE from "three";

type Props = {
  color: string;
  positions: [number, number, number][];
  depth: number;
};

export function ColorInstances({
  color,
  positions,
  depth,
}: Props) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  useLayoutEffect(() => {
    if (!meshRef.current) return;

    const dummy = new THREE.Object3D();

    positions.forEach((position, index) => {
      dummy.position.set(...position);
      dummy.updateMatrix();

      meshRef.current!.setMatrixAt(
        index,
        dummy.matrix
      );
    });

    meshRef.current.instanceMatrix.needsUpdate =
      true;
  }, [positions]);

  return (
    <instancedMesh
      ref={meshRef}
      args={[
        undefined,
        undefined,
        positions.length,
      ]}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[1, 1, depth]} />

      <meshStandardMaterial color={color} />
    </instancedMesh>
  );
}