import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { Suspense } from "react";

function LogoPlane() {
  const texture = useTexture("/nikki_logo.jpeg");

  return (
    <mesh rotation={[0, 0, 0]}>
      <planeGeometry
        args={[2, 2 * (texture.image.height / texture.image.width)]}
      />
      <meshStandardMaterial
        map={texture}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function NikkiLogoPlaneScene() {
  return (
    <div
      style={{
        height: 400,
        borderRadius: 24,
        overflow: "hidden",
        background: "transparent",
      }}
    >
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 3], fov: 50 }}>
        <ambientLight intensity={0.85} />
        <directionalLight position={[2, 2, 3]} intensity={1.1} />
        <Suspense fallback={null}>
          <LogoPlane />
        </Suspense>
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
