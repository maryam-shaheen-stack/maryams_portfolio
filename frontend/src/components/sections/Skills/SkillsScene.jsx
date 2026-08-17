import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import SkillsParticles from "./SkillsParticles";
import SkillsGeo from "./SkillsGeo";
import { subscribeSkillsPosition, getSkillsPosition } from "../../../lib/skillsScrollStore";

function CameraRig({ positionRef }) {
  useFrame((state) => {
    // A single, gentle, non-oscillating dolly across the whole sequence —
    // enough to read as depth, never enough to compete with the type.
    const p = positionRef.current;
    state.camera.position.z = 6 - Math.min(p, 10) * 0.03;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

function Lighting() {
  // Static — no pulsing tied to scroll, so the light never reads as an
  // animated effect fighting for attention with the typography.
  return (
    <>
      <ambientLight intensity={0.35} color={"#16425B"} />
      <pointLight position={[3, 2, 4]} color={"#3A7CA5"} intensity={1.1} />
      <pointLight position={[-3, -1, 2]} color={"#2F6690"} intensity={0.6} />
    </>
  );
}

export default function SkillsScene() {
  const positionRef = useRef(0);

  useEffect(() => {
    positionRef.current = getSkillsPosition();
    return subscribeSkillsPosition((p) => {
      positionRef.current = p;
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
      <CameraRig positionRef={positionRef} />
      <SkillsGeo positionRef={positionRef} />
      <SkillsParticles positionRef={positionRef} />
    </Canvas>
  );
}
