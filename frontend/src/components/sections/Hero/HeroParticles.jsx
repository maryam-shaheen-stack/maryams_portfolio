import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * A sparse dust field that exists ONLY to sell the "name breaking apart"
 * moment. It is fully invisible during State 1 (pure name) and fades back
 * to invisible before the photo appears — it must never compete with the
 * name or the photo as a second focal point.
 */
export default function HeroParticles({ progressRef, count = 220 }) {
  const pointsRef = useRef();

  const [positions, seeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const seed = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
      seed[i] = Math.random();
    }
    return [pos, seed];
  }, [count]);

  useFrame((state, delta) => {
    const p = progressRef.current;
    // Silent during State 1 (name hold), ramps in only once the name starts
    // breaking (~0.20), peaks mid-break, and is fully gone again before the
    // photo emerges (~0.48) — it never overlaps with a settled focal point.
    const energy = THREE.MathUtils.smoothstep(p, 0.2, 0.34) * (1 - THREE.MathUtils.smoothstep(p, 0.38, 0.48));
    const geo = pointsRef.current?.geometry;
    if (!geo) return;
    const arr = geo.attributes.position.array;
    const t = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const s = seeds[i];
      const drift = 0.15 + energy * 1.4;
      arr[i * 3] = positions[i * 3] + Math.sin(t * 0.15 + s * 20) * drift;
      arr[i * 3 + 1] = positions[i * 3 + 1] + Math.cos(t * 0.12 + s * 30) * drift * 0.6 - energy * s * 0.8;
      arr[i * 3 + 2] = positions[i * 3 + 2] + Math.sin(t * 0.1 + s * 10) * drift * 0.5;
    }
    geo.attributes.position.needsUpdate = true;

    if (pointsRef.current.material) {
      // Fully transparent at rest (energy 0) — only visible during the break.
      pointsRef.current.material.opacity = energy * 0.55;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
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
