'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollStore } from '@/components/scroll/useScrollStore';

const DISTRESSED = new THREE.Color('#37322e');
const RENOVATED = new THREE.Color('#6b5f54');

type Vec3 = [number, number, number];

/** Wall that "renovates" (color + roughness) as the viewer scrolls inside. */
function Wall({ position, args }: { position: Vec3; args: Vec3 }) {
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  useFrame(() => {
    const t = THREE.MathUtils.clamp(useScrollStore.getState().journey * 1.7, 0, 1);
    if (mat.current) {
      mat.current.color.copy(DISTRESSED).lerp(RENOVATED, t);
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
function GlowWindow({ position, size = [0.55, 0.85, 0.08] as Vec3, phase = 0 }: { position: Vec3; size?: Vec3; phase?: number }) {
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  useFrame((s) => {
    if (mat.current) mat.current.emissiveIntensity = 0.75 + Math.sin(s.clock.elapsedTime * 1.5 + phase) * 0.3;
  });
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial ref={mat} color="#1a1410" emissive="#d8b45a" emissiveIntensity={0.8} toneMapped={false} />
    </mesh>
  );
}

function Block({ position, args, color = '#2b2622' }: { position: Vec3; args: Vec3; color?: string }) {
  return (
    <mesh position={position}>
      <boxGeometry args={args} />
      <meshStandardMaterial color={color} roughness={0.8} metalness={0.05} />
    </mesh>
  );
}

export default function House() {
  return (
    <group>
      {/* Ground + floor */}
      <mesh position={[0, -0.12, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[120, 120]} />
        <meshStandardMaterial color="#0a0908" roughness={1} />
      </mesh>
      <Block position={[0, -0.05, 0]} args={[8.4, 0.12, 8.4]} color="#211c18" />

      {/* Shell */}
      <Wall position={[0, 1.5, -4]} args={[8, 3, 0.16]} />
      <Wall position={[-4, 1.5, 0]} args={[0.16, 3, 8]} />
      <Wall position={[4, 1.5, 0]} args={[0.16, 3, 8]} />
      {/* Front wall with a centered door gap (x: -1..1) */}
      <Wall position={[-2.5, 1.5, 4]} args={[3, 3, 0.16]} />
      <Wall position={[2.5, 1.5, 4]} args={[3, 3, 0.16]} />
      <Wall position={[0, 2.7, 4]} args={[2.2, 0.6, 0.16]} />

      {/* Roof — 4-sided pyramid over the 8x8 footprint */}
      <mesh position={[0, 4.35, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[6.7, 2.7, 4]} />
        <meshStandardMaterial color="#1b1714" roughness={0.85} metalness={0.1} />
      </mesh>

      {/* Door threshold glow */}
      <mesh position={[0, 0.02, 4]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2, 1.2]} />
        <meshStandardMaterial color="#1a1208" emissive="#c99a3b" emissiveIntensity={0.5} toneMapped={false} />
      </mesh>

      {/* Back feature wall accent */}
      <mesh position={[0, 1.5, -3.9]}>
        <boxGeometry args={[3.2, 1.3, 0.05]} />
        <meshStandardMaterial color="#241a10" emissive="#a16207" emissiveIntensity={0.45} toneMapped={false} />
      </mesh>

      {/* Windows (drive the gold bloom) */}
      <GlowWindow position={[-4.06, 1.6, -1.2]} phase={0} />
      <GlowWindow position={[-4.06, 1.6, 1.2]} phase={1.1} />
      <GlowWindow position={[4.06, 1.6, -1.2]} phase={0.6} />
      <GlowWindow position={[4.06, 1.6, 1.2]} phase={1.8} />
      <GlowWindow position={[-3.1, 1.7, 4.06]} size={[0.6, 0.9, 0.08]} phase={2.2} />
      <GlowWindow position={[3.1, 1.7, 4.06]} size={[0.6, 0.9, 0.08]} phase={0.3} />

      {/* Suggested interior furniture (rooms) */}
      <Block position={[-2, 0.3, -2]} args={[2, 0.6, 0.9]} color="#332b24" />
      <Block position={[-2, 0.75, -2.5]} args={[2, 0.3, 0.3]} color="#3a3129" />
      <Block position={[1.9, 0.2, -1.4]} args={[1.3, 0.4, 0.8]} color="#2a241f" />
      <Block position={[2.7, 0.55, -3]} args={[2.4, 1.1, 0.7]} color="#26201b" />
      <Block position={[0, 0.01, -1]} args={[3.4, 0.02, 3.4]} color="#1a1410" />
    </group>
  );
}
