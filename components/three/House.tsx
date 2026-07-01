'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollStore } from '@/components/scroll/useScrollStore';
import { useThemeStore } from '@/components/theme/useThemeStore';
import { THREE_COLORS } from '@/lib/themes';

type Vec3 = [number, number, number];

/** Wall that "renovates" (color + roughness) as the viewer scrolls inside. */
function Wall({ position, args, distressed, reno }: { position: Vec3; args: Vec3; distressed: string; reno: string }) {
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  const cd = useMemo(() => new THREE.Color(distressed), [distressed]);
  const cr = useMemo(() => new THREE.Color(reno), [reno]);
  useFrame(() => {
    const t = THREE.MathUtils.clamp(useScrollStore.getState().journey * 1.7, 0, 1);
    if (mat.current) {
      mat.current.color.copy(cd).lerp(cr, t);
      mat.current.roughness = THREE.MathUtils.lerp(1, 0.6, t);
    }
  });
  return (
    <mesh position={position}>
      <boxGeometry args={args} />
      <meshStandardMaterial ref={mat} roughness={1} metalness={0} />
    </mesh>
  );
}

/** Emissive window pane — pulses gently and feeds the bloom pass. */
function GlowWindow({ position, size = [0.55, 0.85, 0.08] as Vec3, phase = 0, color }: { position: Vec3; size?: Vec3; phase?: number; color: string }) {
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  useFrame((s) => {
    if (mat.current) mat.current.emissiveIntensity = 0.75 + Math.sin(s.clock.elapsedTime * 1.5 + phase) * 0.3;
  });
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial ref={mat} color="#140f0a" emissive={color} emissiveIntensity={0.8} toneMapped={false} />
    </mesh>
  );
}

function Block({ position, args, color }: { position: Vec3; args: Vec3; color: string }) {
  return (
    <mesh position={position}>
      <boxGeometry args={args} />
      <meshStandardMaterial color={color} roughness={0.8} metalness={0.05} />
    </mesh>
  );
}

export default function House() {
  const theme = useThemeStore((s) => s.theme);
  const c = THREE_COLORS[theme];

  return (
    <group>
      {/* Ground + floor */}
      <mesh position={[0, -0.12, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[120, 120]} />
        <meshStandardMaterial color={c.floor} roughness={1} />
      </mesh>
      <Block position={[0, -0.05, 0]} args={[8.4, 0.12, 8.4]} color={c.base} />

      {/* Shell (renovating walls) */}
      <Wall position={[0, 1.5, -4]} args={[8, 3, 0.16]} distressed={c.wallDistressed} reno={c.wallReno} />
      <Wall position={[-4, 1.5, 0]} args={[0.16, 3, 8]} distressed={c.wallDistressed} reno={c.wallReno} />
      <Wall position={[4, 1.5, 0]} args={[0.16, 3, 8]} distressed={c.wallDistressed} reno={c.wallReno} />
      <Wall position={[-2.5, 1.5, 4]} args={[3, 3, 0.16]} distressed={c.wallDistressed} reno={c.wallReno} />
      <Wall position={[2.5, 1.5, 4]} args={[3, 3, 0.16]} distressed={c.wallDistressed} reno={c.wallReno} />
      <Wall position={[0, 2.7, 4]} args={[2.2, 0.6, 0.16]} distressed={c.wallDistressed} reno={c.wallReno} />

      {/* Roof */}
      <mesh position={[0, 4.35, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[6.7, 2.7, 4]} />
        <meshStandardMaterial color={c.roof} roughness={0.85} metalness={0.1} />
      </mesh>

      {/* Door threshold glow */}
      <mesh position={[0, 0.02, 4]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2, 1.2]} />
        <meshStandardMaterial color="#140f0a" emissive={c.accent} emissiveIntensity={0.5} toneMapped={false} />
      </mesh>

      {/* Back feature wall accent */}
      <mesh position={[0, 1.5, -3.9]}>
        <boxGeometry args={[3.2, 1.3, 0.05]} />
        <meshStandardMaterial color="#140f0a" emissive={c.featureEmissive} emissiveIntensity={0.45} toneMapped={false} />
      </mesh>

      {/* Windows (drive the bloom) */}
      <GlowWindow position={[-4.06, 1.6, -1.2]} phase={0} color={c.accentBright} />
      <GlowWindow position={[-4.06, 1.6, 1.2]} phase={1.1} color={c.accentBright} />
      <GlowWindow position={[4.06, 1.6, -1.2]} phase={0.6} color={c.accentBright} />
      <GlowWindow position={[4.06, 1.6, 1.2]} phase={1.8} color={c.accentBright} />
      <GlowWindow position={[-3.1, 1.7, 4.06]} size={[0.6, 0.9, 0.08]} phase={2.2} color={c.accentBright} />
      <GlowWindow position={[3.1, 1.7, 4.06]} size={[0.6, 0.9, 0.08]} phase={0.3} color={c.accentBright} />

      {/* Suggested interior furniture (rooms) */}
      <Block position={[-2, 0.3, -2]} args={[2, 0.6, 0.9]} color={c.furniture} />
      <Block position={[-2, 0.75, -2.5]} args={[2, 0.3, 0.3]} color={c.furniture} />
      <Block position={[1.9, 0.2, -1.4]} args={[1.3, 0.4, 0.8]} color={c.furniture} />
      <Block position={[2.7, 0.55, -3]} args={[2.4, 1.1, 0.7]} color={c.furniture} />
      <Block position={[0, 0.01, -1]} args={[3.4, 0.02, 3.4]} color={c.base} />
    </group>
  );
}
