'use client';

import { Canvas } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import CameraRig from './CameraRig';
import House from './House';
import Gears from './Gears';

export default function Scene() {
  return (
    <div className="fixed inset-0 z-0" aria-hidden="true">
      <Canvas
        dpr={[1, 1.8]}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 2.4, 17], fov: 42, near: 0.1, far: 120 }}
      >
        <color attach="background" args={['#0c0a09']} />
        <fog attach="fog" args={['#0c0a09', 13, 42]} />

        <ambientLight intensity={0.55} color="#ffe9c7" />
        <hemisphereLight args={['#ffe6bd', '#0a0807', 0.5]} />
        <directionalLight position={[7, 12, 6]} intensity={2.4} color="#fff1d6" />
        <pointLight position={[0, 2.3, -1]} intensity={30} distance={18} color="#e7b461" />
        <pointLight position={[0, 1.6, 5]} intensity={10} distance={14} color="#d8b45a" />

        <CameraRig />
        <House />
        <Gears />

        <Sparkles count={70} scale={[22, 10, 22]} position={[0, 4, 2]} size={2.2} speed={0.25} color="#d8b45a" opacity={0.5} />

        <EffectComposer>
          <Bloom intensity={0.85} luminanceThreshold={0.35} luminanceSmoothing={0.2} mipmapBlur />
          <Vignette offset={0.25} darkness={0.85} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
