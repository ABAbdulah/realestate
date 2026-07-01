'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollStore } from '@/components/scroll/useScrollStore';
import { useThemeStore } from '@/components/theme/useThemeStore';
import { THREE_COLORS } from '@/lib/themes';

type Vec3 = [number, number, number];

function Gear({ position, radius = 1, speed = 1, color, hub }: {
  position: Vec3;
  radius?: number;
  speed?: number;
  color: string;
  hub: string;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (!ref.current) return;
    const vel = useScrollStore.getState().velocity;
    ref.current.rotation.z += dt * speed * (0.18 + Math.min(Math.abs(vel) * 0.03, 1.2));
  });

  // Finer teeth for a machined, precision look.
  const teeth = Math.max(14, Math.round(radius * 16));
  const thickness = 0.16;
  const teethEls = Array.from({ length: teeth }, (_, i) => {
    const a = (i / teeth) * Math.PI * 2;
    return (
      <mesh key={i} position={[Math.cos(a) * radius, Math.sin(a) * radius, 0]} rotation={[0, 0, a]}>
        <boxGeometry args={[0.11, 0.15, thickness]} />
        <meshStandardMaterial color={color} metalness={0.92} roughness={0.32} />
      </mesh>
    );
  });

  return (
    <group ref={ref} position={position}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[radius, radius, thickness, 48]} />
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.34} />
      </mesh>
      {/* inner ring cut-out look */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius * 0.6, 0.05, 12, 40]} />
        <meshStandardMaterial color={hub} metalness={0.85} roughness={0.4} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[radius * 0.2, radius * 0.2, thickness + 0.04, 24]} />
        <meshStandardMaterial color={hub} metalness={0.85} roughness={0.4} />
      </mesh>
    </group>
  );
}

export default function Gears() {
  const theme = useThemeStore((s) => s.theme);
  const c = THREE_COLORS[theme];
  return (
    <group>
      <Gear position={[-7.6, 5.1, -0.5]} radius={1.0} speed={1} color={c.gearA} hub={c.gearHub} />
      <Gear position={[7.9, 5.9, -1.2]} radius={0.66} speed={-1.5} color={c.gearB} hub={c.gearHub} />
      <Gear position={[6.6, 2.4, 1.5]} radius={0.46} speed={1.9} color={c.gearA} hub={c.gearHub} />
    </group>
  );
}
