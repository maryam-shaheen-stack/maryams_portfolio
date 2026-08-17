import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import HeroParticles from "./HeroParticles";
import { subscribeHeroProgress, getHeroProgress } from "../../../lib/scrollStore";

function CameraRig({ progressRef }) {
  useFrame((state) => {
    const p = progressRef.current;
    // Single, simple, one-directional dolly tied directly to scroll —
    // no oscillation, no drift. Just enough to read as "depth," never
    // enough to become its own focal point.
    state.camera.position.z = 6 - p * 0.6;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

function Lighting() {
  // Static lighting. No pulsing/glow tied to scroll — the light should
  // never read as an animated effect competing with the name/photo.
  return (
    <>
      <ambientLight intensity={0.35} color={"#16425B"} />
      <pointLight position={[3, 2, 4]} color={"#3A7CA5"} intensity={1.3} />
      <pointLight position={[-3, -1, 2]} color={"#2F6690"} intensity={0.7} />
    </>
  );
}

export default function HeroScene() {
  const progressRef = useRef(0);

  useEffect(() => {
    progressRef.current = getHeroProgress();
    return subscribeHeroProgress((p) => {
      progressRef.current = p;
    });
  }, []);

  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 6], fov: 45 }}
      style={{ position: "absolute", inset: 0 }}
    >
      <color attach="background" args={["#0F2D3F"]} />
      <fog attach="fog" args={["#0F2D3F", 4, 12]} />
      <Lighting />
      <CameraRig progressRef={progressRef} />
      <HeroParticles progressRef={progressRef} />
    </Canvas>
  );
}
