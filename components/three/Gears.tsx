'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollStore } from '@/components/scroll/useScrollStore';

type Vec3 = [number, number, number];

function Gear({ position, radius = 1, teeth = 10, speed = 1, color = '#A16207' }: {
  position: Vec3;
  radius?: number;
  teeth?: number;
  speed?: number;
  color?: string;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (!ref.current) return;
    const vel = useScrollStore.getState().velocity;
    ref.current.rotation.z += dt * speed * (0.25 + Math.min(Math.abs(vel) * 0.04, 2));
  });

  const teethEls = Array.from({ length: teeth }, (_, i) => {
    const a = (i / teeth) * Math.PI * 2;
    return (
      <mesh key={i} position={[Math.cos(a) * radius, Math.sin(a) * radius, 0]} rotation={[0, 0, a]}>
        <boxGeometry args={[0.2, 0.2, 0.28]} />
        <meshStandardMaterial color={color} metalness={0.75} roughness={0.35} />
      </mesh>
    );
  });

  return (
    <group ref={ref} position={position}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[radius, radius, 0.24, 40]} />
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.4} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[radius * 0.28, radius * 0.28, 0.3, 24]} />
        <meshStandardMaterial color="#3a2a10" metalness={0.6} roughness={0.5} />
      </mesh>
      {teethEls}
    </group>
  );
}

export default function Gears() {
  return (
    <group>
      <Gear position={[-6.5, 4.2, 1]} radius={1.3} teeth={12} speed={1} />
      <Gear position={[6.8, 5.6, -1]} radius={0.85} teeth={9} speed={-1.4} color="#D8B45A" />
      <Gear position={[5.2, 3.1, 3]} radius={0.6} teeth={8} speed={1.8} />
    </group>
  );
}
