import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

type Canvas3DProps = {
    children: React.ReactNode;
};


export default function Canvas3D({
    children
}: Canvas3DProps) {
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.Camera | null>(null);

    return (
        <Canvas
            dpr={4}
            camera={{
                position: [0,0,5],
                fov:50,
            }}
            gl={{
                antialias:true,
                preserveDrawingBuffer:true,
                alpha:true,
            }}
            onCreated={({
                gl,
                scene,
                camera
            }) => {
                gl.setClearColor(
                    0x000000,
                    0
                );
                gl.outputColorSpace =
                    THREE.SRGBColorSpace;
                rendererRef.current = gl;
                sceneRef.current = scene;
                cameraRef.current = camera;
            }}
        >
            <ambientLight intensity={1.5}/>
            <directionalLight
                position={[5,5,5]}
                intensity={2}
            />
            <directionalLight
                position={[-5,-5,3]}
                intensity={1}
            />
            {children}
        </Canvas>
    );
}