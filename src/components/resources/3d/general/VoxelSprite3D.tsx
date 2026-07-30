/*
A 2D image converted into a 3D voxel sprite.
*/
import { useRef } from "react";
import * as THREE from "three";
import { VoxelSprite } from "../basic/VoxelSprite";
import { useAnimationTimeline } from "../../../../features/animation/hooks/useAnimationTimeline";
import type { ComponentMode } from "../../componentMode";


type VoxelSprite3DProps = {
    imageUrl: string;
    // voxelSize?: number;
    depth?: number;
};

type VoxelSprite3DType = React.FC<VoxelSprite3DProps> & {
    canvas_mode: "3d";
};



export const VoxelSprite3D: VoxelSprite3DType = ({
    imageUrl,
    // voxelSize = 0.01,
    depth = 15,
}: VoxelSprite3DProps) => {

    const ref = useRef<THREE.Group>(null);

    useAnimationTimeline(ref, (tl, object) => {
        // Flip
        tl.fromTo(
            object.rotation,
            {
                x: 0,
            },
            {
                x: Math.PI * 2,
                duration: 1,
                ease: "power2.inOut",
            },
            0
        );

        // Jump
        tl.fromTo(
            object.position,
            {
                y: 0,
            },
            {
                y: 0.6,
                duration: 0.5,
                ease: "power2.out",
                yoyo: true,
                repeat: 1,
            },
            0
        );

        // Scale impulse
        tl.fromTo(
            object.scale,
            {
                x: 1,
                y: 1,
                z: 1,
            },
            {
                x: 1.08,
                y: 1.08,
                z: 1.08,
                duration: 0.5,
                yoyo: true,
                repeat: 1,
                ease: "power1.inOut",
            },
            0
        );
    });

    return (
        <group ref={ref}>
            <VoxelSprite
                imageUrl={imageUrl}
                // voxelSize={voxelSize}
                depth={depth}
            />
        </group>
    );
};

VoxelSprite3D.canvas_mode = "3d" satisfies ComponentMode;

export default VoxelSprite3D;