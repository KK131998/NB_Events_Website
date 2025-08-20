// src/components/NikkiLogoPlane.tsx
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three"; // hinzufügen
import { Suspense } from "react";

function LogoPlane() {
    // Bild als Textur laden
    const texture = useTexture("/nikki_logo.jpeg");

    return (
        <mesh rotation={[0, 0, 0]}>
            {/* Breite 2, Höhe automatisch skaliert */}
            <planeGeometry args={[2, 2 * (texture.image.height / texture.image.width)]} />
            <meshStandardMaterial map={texture} transparent side={THREE.DoubleSide} />
        </mesh>
    );
}

export default function NikkiLogoPlaneScene() {
    return (
        <div
            style={{
                height: 420,
                borderRadius: 20,
                overflow: "hidden",
                background:
                    "transparent",
            }}
        >
            <Canvas
                dpr={[1, 2]}
                camera={{ position: [0, 0, 3], fov: 50 }}
            >
                {/* Licht */}
                <ambientLight intensity={0.8} />
                <directionalLight position={[2, 2, 3]} intensity={1} />

                {/* Das Logo */}
                <Suspense fallback={null}>
                    <LogoPlane />
                </Suspense>

                {/* Auto-Rotation */}
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={1.5}
                />
            </Canvas>
        </div>
    );
}
