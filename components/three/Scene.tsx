'use client';

import { Canvas } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import CameraRig from './CameraRig';
import House from './House';
import Gears from './Gears';
import { useThemeStore } from '@/components/theme/useThemeStore';
import { THREE_COLORS } from '@/lib/themes';

export default function Scene() {
  const theme = useThemeStore((s) => s.theme);
  const c = THREE_COLORS[theme];
  const dark = theme === 'gold';

  return (
    <div className="fixed inset-0 z-0" aria-hidden="true">
      <Canvas
        dpr={[1, 1.8]}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 2.4, 17], fov: 42, near: 0.1, far: 120 }}
      >
        <color attach="background" args={[c.bg]} />
        <fog attach="fog" args={[c.fog, 13, 42]} />

        <ambientLight intensity={dark ? 0.55 : 0.95} color={c.ambient} />
        <hemisphereLight args={[c.hemiSky, c.hemiGround, dark ? 0.5 : 0.85]} />
        <directionalLight position={[7, 12, 6]} intensity={dark ? 2.4 : 2.9} color={c.dir} />
        <pointLight position={[0, 2.3, -1]} intensity={dark ? 30 : 16} distance={18} color={c.point1} />
        <pointLight position={[0, 1.6, 5]} intensity={dark ? 10 : 6} distance={14} color={c.point2} />

        <CameraRig />
        <House />
        <Gears />

        <Sparkles count={70} scale={[22, 10, 22]} position={[0, 4, 2]} size={2.2} speed={0.25} color={c.sparkle} opacity={dark ? 0.5 : 0.35} />

        <EffectComposer>
          <Bloom intensity={dark ? 0.85 : 0.45} luminanceThreshold={dark ? 0.35 : 0.6} luminanceSmoothing={0.2} mipmapBlur />
          <Vignette offset={0.25} darkness={dark ? 0.85 : 0.35} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
