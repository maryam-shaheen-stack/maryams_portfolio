import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function transitionEnergy(position) {
  const frac = position - Math.floor(position);
  return 1 - Math.abs(2 * frac - 1);
}

/**
 * Two nested wireframe forms drifting slowly behind the cards. Rotation is
 * constant and predictable (never randomized), and only the scale/opacity
 * respond to scroll — a gentle lift during transitions, calm at rest —
 * so the shape reads as atmosphere tied to scroll, not an independent loop.
 */
export default function SkillsGeo({ positionRef }) {
  const outerRef = useRef();
  const innerRef = useRef();

  useFrame((state, delta) => {
    const energy = transitionEnergy(positionRef.current);

    if (outerRef.current) {
      outerRef.current.rotation.y += delta * 0.045;
      outerRef.current.rotation.x += delta * 0.015;
      const s = 1 + energy * 0.06;
      outerRef.current.scale.setScalar(s);
      outerRef.current.material.opacity = 0.16 + energy * 0.14;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y -= delta * 0.03;
      innerRef.current.rotation.z += delta * 0.02;
      innerRef.current.material.opacity = 0.1 + energy * 0.1;
    }
  });

  return (
    <group position={[0, 0, -3]}>
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[2.4, 1]} />
        <meshBasicMaterial color={"#3A7CA5"} wireframe transparent opacity={0.16} />
      </mesh>
      <mesh ref={innerRef}>
        <octahedronGeometry args={[1.5, 0]} />
        <meshBasicMaterial color={"#2F6690"} wireframe transparent opacity={0.1} />
      </mesh>
    </group>
  );
}
