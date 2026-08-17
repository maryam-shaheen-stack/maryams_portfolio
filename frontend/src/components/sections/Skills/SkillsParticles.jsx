import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Energy is a triangle wave of the fractional part of the virtual scroll
 * position: 0 exactly when an item is settled in focus (fraction near 0
 * or 1), peaking at the midpoint of a transition (fraction near 0.5).
 * This ties the particles directly to scroll — never a standalone loop.
 */
function transitionEnergy(position) {
  const frac = position - Math.floor(position);
  return 1 - Math.abs(2 * frac - 1);
}

export default function SkillsParticles({ positionRef, count = 340 }) {
  const pointsRef = useRef();

  const [positions, seeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const seed = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
      seed[i] = Math.random();
    }
    return [pos, seed];
  }, [count]);

  useFrame((state) => {
    const energy = transitionEnergy(positionRef.current) * 0.6;
    const geo = pointsRef.current?.geometry;
    if (!geo) return;
    const arr = geo.attributes.position.array;
    const t = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const s = seeds[i];
      // Always drifts a little, even at rest — the energy boost during
      // transitions is additive on top of a calm idle motion, not the
      // difference between "still" and "moving".
      const drift = 0.22 + energy * 0.8;
      arr[i * 3] = positions[i * 3] + Math.sin(t * 0.12 + s * 20) * drift;
      arr[i * 3 + 1] = positions[i * 3 + 1] + Math.cos(t * 0.1 + s * 30) * drift * 0.6;
      arr[i * 3 + 2] = positions[i * 3 + 2] + Math.sin(t * 0.08 + s * 10) * drift * 0.5;
    }
    geo.attributes.position.needsUpdate = true;

    if (pointsRef.current.material) {
      // Idle opacity keeps the field visible at rest; energy adds a soft
      // lift during transitions rather than switching it on from zero.
      pointsRef.current.material.opacity = 0.12 + energy * 0.35;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.024}
        color={"#3A7CA5"}
        transparent
        opacity={0}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
