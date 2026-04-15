import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame, ThreeEvent } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

const GROUPS = [
  { label: "Backend", skills: ["PHP", "Node.js", "REST APIs", "MySQL"], color: "#6366f1" },
  { label: "AWS & Cloud", skills: ["EC2", "S3", "Lambda", "Serverless"], color: "#f97316" },
  { label: "UI / UX", skills: ["React", "Tailwind", "Figma", "TypeScript"], color: "#a855f7" },
] as const;

type GroupIndex = 0 | 1 | 2;

function buildFaceColors(geo: THREE.IcosahedronGeometry) {
  const count = geo.attributes.position.count;
  const colors = new Float32Array(count * 3);
  const faceCount = count / 3;
  const perGroup = Math.floor(faceCount / 3);

  for (let f = 0; f < faceCount; f++) {
    const gi = f < perGroup ? 0 : f < perGroup * 2 ? 1 : 2;
    const c = new THREE.Color(GROUPS[gi].color);
    for (let v = 0; v < 3; v++) {
      colors[(f * 3 + v) * 3 + 0] = c.r;
      colors[(f * 3 + v) * 3 + 1] = c.g;
      colors[(f * 3 + v) * 3 + 2] = c.b;
    }
  }
  return colors;
}

function getFaceGroup(geo: THREE.IcosahedronGeometry, faceIndex: number): GroupIndex {
  const faceCount = geo.attributes.position.count / 3;
  const perGroup = Math.floor(faceCount / 3);
  if (faceIndex < perGroup) return 0;
  if (faceIndex < perGroup * 2) return 1;
  return 2;
}

function Orb({ onGroupChange }: { onGroupChange: (g: GroupIndex | null) => void }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState<GroupIndex | null>(null);
  const [locked, setLocked] = useState<GroupIndex | null>(null);

  const geo = useMemo(() => {
    const g = new THREE.IcosahedronGeometry(1.4, 1);
    g.setAttribute("color", new THREE.BufferAttribute(buildFaceColors(g), 3));
    return g;
  }, []);

  const mat = useMemo(
    () =>
      new THREE.MeshPhongMaterial({
        vertexColors: true,
        shininess: 60,
        transparent: true,
        opacity: 0.92,
      }),
    []
  );

  useFrame((_, delta) => {
    const active = locked ?? hovered;
    if (active === null) {
      meshRef.current.rotation.y += delta * 0.4;
      meshRef.current.rotation.x += delta * 0.15;
    }

    // pulse emissive on active group
    const faceCount = geo.attributes.position.count / 3;
    const perGroup = Math.floor(faceCount / 3);
    const colors = geo.attributes.color.array as Float32Array;
    const t = (Math.sin(Date.now() * 0.004) + 1) * 0.5;

    for (let f = 0; f < faceCount; f++) {
      const gi = f < perGroup ? 0 : f < perGroup * 2 ? 1 : 2;
      const base = new THREE.Color(GROUPS[gi].color);
      const bright = base.clone().multiplyScalar(1 + (active === gi ? t * 0.8 : 0));
      for (let v = 0; v < 3; v++) {
        colors[(f * 3 + v) * 3 + 0] = bright.r;
        colors[(f * 3 + v) * 3 + 1] = bright.g;
        colors[(f * 3 + v) * 3 + 2] = bright.b;
      }
    }
    geo.attributes.color.needsUpdate = true;
  });

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    if (locked !== null) return;
    const gi = getFaceGroup(geo, e.faceIndex ?? 0);
    if (gi !== hovered) {
      setHovered(gi);
      onGroupChange(gi);
    }
  };

  const handlePointerOut = () => {
    if (locked !== null) return;
    setHovered(null);
    onGroupChange(null);
  };

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    const gi = getFaceGroup(geo, e.faceIndex ?? 0);
    const next = locked === gi ? null : gi;
    setLocked(next);
    setHovered(null);
    onGroupChange(next);
  };

  return (
    <mesh
      ref={meshRef}
      geometry={geo}
      material={mat}
      onPointerMove={handlePointerMove}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    />
  );
}

export default function SkillsOrb() {
  const [active, setActive] = useState<GroupIndex | null>(null);
  const group = active !== null ? GROUPS[active] : null;

  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="w-64 h-64 cursor-pointer">
        <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 5, 5]} intensity={1.2} />
          <pointLight position={[-5, -3, -5]} intensity={0.4} />
          <Orb onGroupChange={setActive} />
        </Canvas>
      </div>

      <div className="h-28 flex flex-col items-center justify-start pt-2">
        {group ? (
          <div className="text-center animate-fade-in">
            <p
              className="font-semibold text-base mb-2"
              style={{ color: group.color }}
            >
              {group.label}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {group.skills.map((s) => (
                <span
                  key={s}
                  className="text-xs px-2.5 py-1 rounded-full border font-mono"
                  style={{ borderColor: group.color, color: group.color, background: `${group.color}18` }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground text-xs font-mono mt-1">
            hover or click a face
          </p>
        )}
      </div>
    </div>
  );
}
