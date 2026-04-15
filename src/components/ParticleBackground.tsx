import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 600;

interface ParticlesProps {
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
}

const Particles = ({ mouseRef }: ParticlesProps) => {
  const mesh = useRef<THREE.Points>(null!);
  // smoothed target for lerping
  const smooth = useRef({ x: 0, y: 0 });

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const sz = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      sz[i] = Math.random() * 2 + 0.5;
    }
    return [pos, sz];
  }, []);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.getElapsedTime();

    // lerp smooth cursor toward actual cursor (0.04 = gentle lag)
    smooth.current.x += (mouseRef.current.x - smooth.current.x) * 0.04;
    smooth.current.y += (mouseRef.current.y - smooth.current.y) * 0.04;

    // idle drift + cursor nudge (max ±0.25 rad)
    mesh.current.rotation.y = t * 0.03 + smooth.current.x * 0.25;
    mesh.current.rotation.x = Math.sin(t * 0.02) * 0.1 - smooth.current.y * 0.25;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size"     args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#2dd4bf"
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
};

interface ParticleBackgroundProps {
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
}

const ParticleBackground = ({ mouseRef }: ParticleBackgroundProps) => (
  <div className="absolute inset-0">
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, powerPreference: "low-power" }}
      style={{ background: "transparent" }}
    >
      <Particles mouseRef={mouseRef} />
    </Canvas>
  </div>
);

export default ParticleBackground;
