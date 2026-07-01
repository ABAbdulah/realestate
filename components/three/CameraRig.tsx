'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollStore } from '@/components/scroll/useScrollStore';

// Camera keyframes: far outside -> through the door -> inside rooms -> pull up.
const POS: THREE.Vector3[] = [
  new THREE.Vector3(0, 2.4, 17),
  new THREE.Vector3(0.8, 2.0, 11),
  new THREE.Vector3(0, 1.75, 6.8),
  new THREE.Vector3(0, 1.6, 4.2),
  new THREE.Vector3(0, 1.55, 1.4),
  new THREE.Vector3(1.8, 1.6, -0.6),
  new THREE.Vector3(-1.7, 1.55, -2.6),
  new THREE.Vector3(0, 2.3, -3.3),
  new THREE.Vector3(0, 6.6, -7.5),
];

const TGT: THREE.Vector3[] = [
  new THREE.Vector3(0, 1.6, 4),
  new THREE.Vector3(0, 1.55, 3),
  new THREE.Vector3(0, 1.5, 1.5),
  new THREE.Vector3(0, 1.5, 0),
  new THREE.Vector3(0.6, 1.5, -2),
  new THREE.Vector3(2.4, 1.3, -4),
  new THREE.Vector3(-2.4, 1.3, -4),
  new THREE.Vector3(0, 1.1, -4),
  new THREE.Vector3(0, 0.4, -2),
];

export default function CameraRig() {
  const setJourney = useScrollStore((s) => s.setJourney);

  const posCurve = useMemo(() => new THREE.CatmullRomCurve3(POS, false, 'catmullrom', 0.5), []);
  const tgtCurve = useMemo(() => new THREE.CatmullRomCurve3(TGT, false, 'catmullrom', 0.5), []);

  const look = useRef(new THREE.Vector3(0, 1.6, 4));
  const tmpP = useRef(new THREE.Vector3());
  const tmpT = useRef(new THREE.Vector3());
  const region = useRef<HTMLElement | null>(null);

  useFrame((state, dt) => {
    if (!region.current) region.current = document.getElementById('journey-region');

    let t = 0;
    if (region.current) {
      const rect = region.current.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      t = total > 0 ? THREE.MathUtils.clamp(-rect.top / total, 0, 1) : 0;
    }
    setJourney(t);

    posCurve.getPoint(t, tmpP.current);
    tgtCurve.getPoint(t, tmpT.current);

    const k = 1 - Math.exp(-5 * dt);
    state.camera.position.lerp(tmpP.current, k);

    // Subtle mouse parallax, fading out as we move inside the house.
    const par = (1 - t) * 0.6;
    state.camera.position.x += state.pointer.x * par * 0.3;
    state.camera.position.y += state.pointer.y * par * 0.2;

    look.current.lerp(tmpT.current, k);
    state.camera.lookAt(look.current);
  });

  return null;
}
