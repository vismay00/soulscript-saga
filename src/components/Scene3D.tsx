import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Box, Cone, Cylinder, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { BoyCharacter } from "./BoyCharacter";

interface Scene3DProps {
  environment: "forest" | "clearing" | "cave" | "cliff" | "temple" | "sunrise";
}

export const Scene3D = ({ environment }: Scene3DProps) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  const environmentColors = useMemo(() => {
    switch (environment) {
      case "forest":
        return { primary: "#8bc34a", secondary: "#689f38", accent: "#558b2f", ground: "#a1887f", sky: "#87ceeb" };
      case "clearing":
        return { primary: "#66bb6a", secondary: "#4caf50", accent: "#388e3c", ground: "#d7ccc8", sky: "#b3e5fc" };
      case "cave":
        return { primary: "#1a1a2e", secondary: "#16213e", accent: "#2d3561", ground: "#424242", sky: "#263238" };
      case "cliff":
        return { primary: "#7b1fa2", secondary: "#6a1b9a", accent: "#4a148c", ground: "#5d4037", sky: "#7986cb" };
      case "temple":
        return { primary: "#ff6f00", secondary: "#f57c00", accent: "#e65100", ground: "#6d4c41", sky: "#ffcc80" };
      case "sunrise":
        return { primary: "#ff6b35", secondary: "#f7931e", accent: "#ffaa00", ground: "#8d6e63", sky: "#ffe0b2" };
      default:
        return { primary: "#8bc34a", secondary: "#689f38", accent: "#558b2f", ground: "#a1887f", sky: "#87ceeb" };
    }
  }, [environment]);

  return (
    <>
      <group ref={groupRef}>
      {/* Sky sphere for daytime */}
      <Sphere args={[100, 32, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial color={environmentColors.sky} side={THREE.BackSide} />
      </Sphere>
      
      {/* Bright daytime lighting */}
      <ambientLight intensity={0.8} />
      
      {/* Sun light */}
      <directionalLight position={[10, 20, 10]} intensity={2} color="#fffacd" castShadow />
      <directionalLight position={[-10, 15, -5]} intensity={0.5} color="#fff9e6" />
      
      {/* Environment-specific lighting */}
      {environment === "sunrise" && (
        <>
          <pointLight position={[0, 5, -10]} intensity={2} color="#ff6b35" />
          <pointLight position={[-5, 3, -8]} intensity={1} color="#f7931e" />
        </>
      )}
      
      {environment === "temple" && (
        <>
          <pointLight position={[0, 8, 0]} intensity={1.5} color="#ff9800" />
          <pointLight position={[-4, 4, -4]} intensity={0.8} color="#ffb74d" />
        </>
      )}

      {/* Controllable boy character - appears in all environments */}
      <BoyCharacter />

      {/* Forest environment with huts, bushes, and playing boy */}
      {environment === "forest" && (
        <>
          {/* Ground */}
          <Box args={[40, 0.2, 40]} position={[0, 0, -10]}>
            <meshStandardMaterial color={environmentColors.ground} />
          </Box>
          {/* Small bushes scattered around (randomized) */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = Math.random() * Math.PI * 2;
            const radius = 7 + Math.random() * 10;
            const x = Math.cos(angle) * radius;
            const z = -10 + Math.sin(angle) * radius;
            const y = 0;
            const scale = 0.5 + Math.random() * 0.4;
            const color = `hsl(${100 + Math.random() * 40}, 50%, ${40 + Math.random() * 20}%)`;
            return (
              <Sphere key={`bush-${i}`} args={[scale, 16, 16]} position={[x, y, z]}>
                <meshStandardMaterial color={color} roughness={0.8} />
              </Sphere>
            );
          })}
          {/* Small huts (slightly varied) */}
          {[[-5, 0, -10], [5, 0, -12], [0, 0, -18]].map((pos, i) => {
            const rot = Math.random() * Math.PI * 2;
            const scale = 0.95 + Math.random() * 0.15;
            return (
              <group key={`hut-${i}`} position={pos as [number, number, number]} rotation={[0, rot, 0]} scale={scale}>
                {/* Hut walls */}
                <Box args={[2, 2, 2]} position={[0, 1, 0]}>
                  <meshStandardMaterial color="#8d6e63" />
                </Box>
                {/* Hut roof */}
                <Cone args={[1.6, 1.5, 4]} position={[0, 2.7, 0]}>
                  <meshStandardMaterial color="#5d4037" />
                </Cone>
                {/* Door */}
                <Box args={[0.6, 1, 0.1]} position={[0, 0.5, 1.05]}>
                  <meshStandardMaterial color="#3e2723" />
                </Box>
              </group>
            );
          })}
          {/* Trees in background (randomized) */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = Math.random() * Math.PI * 2;
            const radius = 18 + Math.random() * 6;
            const x = Math.cos(angle) * radius;
            const z = -10 + Math.sin(angle) * radius;
            const y = 0;
            const trunkHeight = 5 + Math.random() * 2;
            const trunkRadius = 0.25 + Math.random() * 0.15;
            const foliageHeight = 2.5 + Math.random() * 1.5;
            const foliageRadius = 1.2 + Math.random() * 0.7;
            const trunkColor = `hsl(90, 30%, ${25 + Math.random() * 10}%)`;
            const foliageColor = `hsl(${100 + Math.random() * 40}, 50%, ${30 + Math.random() * 30}%)`;
            return (
              <group key={`tree-${i}`} position={[x, y, z]}>
                <Cylinder args={[trunkRadius, trunkRadius, trunkHeight, 8]} position={[0, trunkHeight / 2, 0]}>
                  <meshStandardMaterial color={trunkColor} />
                </Cylinder>
                <Cone args={[foliageRadius, foliageHeight, 8]} position={[0, trunkHeight + foliageHeight / 2, 0]}>
                  <meshStandardMaterial color={foliageColor} />
                </Cone>
              </group>
            );
          })}
          {/* Rocks (randomized) */}
          {Array.from({ length: 6 }).map((_, i) => {
            const angle = Math.random() * Math.PI * 2;
            const radius = 5 + Math.random() * 12;
            const x = Math.cos(angle) * radius;
            const z = -10 + Math.sin(angle) * radius;
            const y = 0.2;
            const scale = 0.3 + Math.random() * 0.5;
            return (
              <Sphere key={`rock-${i}`} args={[scale, 12, 12]} position={[x, y, z]}>
                <meshStandardMaterial color="#757575" roughness={1} />
              </Sphere>
            );
          })}
          {/* Flowers (randomized, clusters) */}
          {Array.from({ length: 5 }).map((_, i) => {
            const clusterCenterAngle = Math.random() * Math.PI * 2;
            const clusterRadius = 8 + Math.random() * 10;
            const cx = Math.cos(clusterCenterAngle) * clusterRadius;
            const cz = -10 + Math.sin(clusterCenterAngle) * clusterRadius;
            return Array.from({ length: 4 }).map((_, j) => {
              const offsetAngle = Math.random() * Math.PI * 2;
              const offsetRadius = 0.2 + Math.random() * 0.5;
              const x = cx + Math.cos(offsetAngle) * offsetRadius;
              const z = cz + Math.sin(offsetAngle) * offsetRadius;
              const y = 0.1;
              const color = `hsl(${330 + Math.random() * 30}, 70%, ${60 + Math.random() * 20}%)`;
              return (
                <Sphere key={`flower-${i}-${j}`} args={[0.12, 8, 8]} position={[x, y, z]}>
                  <meshStandardMaterial color={color} />
                </Sphere>
              );
            });
          })}
        </>
      )}

      {/* Clearing environment */}
      {environment === "clearing" && (
        <>
          {/* Car (simple box model) */}
          <group position={[10, 0.25, -5]} rotation={[0, -0.3, 0]}>
            {/* Car body */}
            <Box args={[1.8, 0.4, 0.8]} position={[0, 0.2, 0]}>
              <meshStandardMaterial color="#1976d2" />
            </Box>
            {/* Car roof */}
            <Box args={[1, 0.3, 0.8]} position={[0, 0.5, 0]}>
              <meshStandardMaterial color="#90caf9" />
            </Box>
            {/* Wheels */}
            <Sphere args={[0.18, 12, 12]} position={[-0.7, 0, 0.35]}>
              <meshStandardMaterial color="#212121" />
            </Sphere>
            <Sphere args={[0.18, 12, 12]} position={[0.7, 0, 0.35]}>
              <meshStandardMaterial color="#212121" />
            </Sphere>
            <Sphere args={[0.18, 12, 12]} position={[-0.7, 0, -0.35]}>
              <meshStandardMaterial color="#212121" />
            </Sphere>
            <Sphere args={[0.18, 12, 12]} position={[0.7, 0, -0.35]}>
              <meshStandardMaterial color="#212121" />
            </Sphere>
          </group>
          <Box args={[40, 0.2, 40]} position={[0, 0, -10]}>
            <meshStandardMaterial color={environmentColors.primary} />
          </Box>
          {/* Mountain (large cone) */}
          <Cone args={[8, 18, 24]} position={[15, 9, -30]} rotation={[-0.1, 0.2, 0]}>
            <meshStandardMaterial color="#bdbdbd" />
          </Cone>
          {/* River (long blue box) */}
          <Box args={[3, 0.12, 30]} position={[-10, 0.07, -20]} rotation={[0, 0.1, 0]}>
            <meshStandardMaterial color="#4fc3f7" transparent opacity={0.85} />
          </Box>
          {/* Boat (simple hull and mast) */}
          <group position={[-10, 0.25, -18]} rotation={[0, 0.2, 0]}>
            {/* Hull */}
            <Box args={[1.2, 0.2, 0.5]} position={[0, 0, 0]}>
              <meshStandardMaterial color="#8d5524" />
            </Box>
            {/* Bow */}
            <Cone args={[0.25, 0.5, 8]} position={[0.6, 0.1, 0]} rotation={[Math.PI / 2, 0, Math.PI / 2]}>
              <meshStandardMaterial color="#a47551" />
            </Cone>
            {/* Stern */}
            <Cone args={[0.2, 0.4, 8]} position={[-0.6, 0.1, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
              <meshStandardMaterial color="#a47551" />
            </Cone>
            {/* Mast */}
            <Cylinder args={[0.04, 0.04, 0.8, 8]} position={[0, 0.5, 0]}>
              <meshStandardMaterial color="#d7ccc8" />
            </Cylinder>
            {/* Sail */}
            <Box args={[0.01, 0.5, 0.5]} position={[0.1, 0.7, 0]}>
              <meshStandardMaterial color="#fffde7" />
            </Box>
          </group>

          {/* More houses (huts) */}
          {[
            [-8, 0, -8], [8, 0, -12], [0, 0, -18], [5, 0, -6], [-5, 0, -15], [10, 0, -10]
          ].map((pos, i) => (
            <group key={`clearing-hut-${i}`} position={pos as [number, number, number]} rotation={[0, Math.random() * Math.PI * 2, 0]} scale={0.9 + Math.random() * 0.2}>
              {/* Hut walls */}
              <Box args={[2, 2, 2]} position={[0, 1, 0]}>
                <meshStandardMaterial color="#bcaaa4" />
              </Box>
              {/* Hut roof */}
              <Cone args={[1.6, 1.5, 4]} position={[0, 2.7, 0]}>
                <meshStandardMaterial color="#6d4c41" />
              </Cone>
              {/* Door */}
              <Box args={[0.6, 1, 0.1]} position={[0, 0.5, 1.05]}>
                <meshStandardMaterial color="#3e2723" />
              </Box>
            </group>
          ))}

          {/* More people (simple figures) */}
          {[
            [-7, 0.9, -10], [7, 0.9, -13], [2, 0.9, -16], [-3, 0.9, -14], [6, 0.9, -8]
          ].map((pos, i) => (
            <group key={`clearing-person-${i}`} position={pos as [number, number, number]}>
              {/* Head */}
              <Sphere args={[0.25, 12, 12]} position={[0, 0.7, 0]}>
                <meshStandardMaterial color="#ffe0b2" />
              </Sphere>
              {/* Body */}
              <Cylinder args={[0.18, 0.22, 0.7, 12]} position={[0, 0.2, 0]}>
                <meshStandardMaterial color={i % 2 === 0 ? "#8bc34a" : "#f06292"} />
              </Cylinder>
              {/* Arms */}
              <Cylinder args={[0.07, 0.07, 0.4, 8]} position={[-0.22, 0.3, 0]} rotation={[0, 0, Math.PI / 4]}>
                <meshStandardMaterial color="#ffe0b2" />
              </Cylinder>
              <Cylinder args={[0.07, 0.07, 0.4, 8]} position={[0.22, 0.3, 0]} rotation={[0, 0, -Math.PI / 4]}>
                <meshStandardMaterial color="#ffe0b2" />
              </Cylinder>
              {/* Legs */}
              <Cylinder args={[0.08, 0.08, 0.5, 8]} position={[-0.08, -0.2, 0]}>
                <meshStandardMaterial color="#616161" />
              </Cylinder>
              <Cylinder args={[0.08, 0.08, 0.5, 8]} position={[0.08, -0.2, 0]}>
                <meshStandardMaterial color="#616161" />
              </Cylinder>
            </group>
          ))}

          {/* Magical floating orbs */}
          {[0, 1, 2, 3, 4].map((i) => (
            <Sphere key={i} args={[0.5, 32, 32]} position={[Math.cos(i) * 6, 2 + Math.sin(i * 2) * 0.5, -8 + Math.sin(i) * 6]}>
              <MeshDistortMaterial color={environmentColors.accent} distort={0.3} speed={2} />
            </Sphere>
          ))}
          {/* Stones */}
          {[[-5, 0.2, -7], [5, 0.2, -12], [0, 0.2, -15]].map((pos, i) => (
            <Box key={`stone-${i}`} args={[0.7, 0.3, 0.7]} position={pos as [number, number, number]}>
              <meshStandardMaterial color="#b0bec5" />
            </Box>
          ))}
          {/* Flowers */}
          {[[-3, 0.1, -9], [4, 0.1, -10], [7, 0.1, -13]].map((pos, i) => (
            <Sphere key={`clearing-flower-${i}`} args={[0.12, 8, 8]} position={pos as [number, number, number]}>
              <meshStandardMaterial color="#f06292" />
            </Sphere>
          ))}
          {/* Pond */}
          <Cylinder args={[2, 2, 0.2, 32]} position={[-6, 0.11, -15]}>
            <meshStandardMaterial color="#4fc3f7" transparent opacity={0.7} />
          </Cylinder>
        </>
      )}

      {/* Cave environment */}
      {environment === "cave" && (
        <>
          <Box args={[30, 15, 30]} position={[0, 7, -10]}>
            <meshStandardMaterial color={environmentColors.primary} side={THREE.BackSide} />
          </Box>
          {/* Stalactites */}
          {[0, 1, 2].map((i) => (
            <Cone key={i} args={[1, 4, 8]} position={[i * 4 - 4, 14, -10 + i * 3]} rotation={[Math.PI, 0, 0]}>
              <meshStandardMaterial color={environmentColors.secondary} />
            </Cone>
          ))}
          {/* Crystals */}
          {[[-2, 0.5, -8], [3, 0.5, -12], [6, 0.5, -15]].map((pos, i) => (
            <Cone key={`crystal-${i}`} args={[0.3, 1.2, 6]} position={pos as [number, number, number]}>
              <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={0.7} />
            </Cone>
          ))}
          {/* Rocks */}
          {[[-5, 0.2, -7], [5, 0.2, -10]].map((pos, i) => (
            <Sphere key={`cave-rock-${i}`} args={[0.5, 10, 10]} position={pos as [number, number, number]}>
              <meshStandardMaterial color="#616161" />
            </Sphere>
          ))}
        </>
      )}

      {/* Cliff environment */}
      {environment === "cliff" && (
        <>
          <Box args={[15, 0.5, 15]} position={[0, 0, -5]}>
            <meshStandardMaterial color={environmentColors.primary} />
          </Box>
          {[-3, 0, 3].map((x, i) => (
            <Box key={i} args={[2, 8, 2]} position={[x, -4, -12]}>
              <meshStandardMaterial color={environmentColors.secondary} />
            </Box>
          ))}
          {/* Boulders */}
          {[[-5, 0.3, -8], [5, 0.3, -10]].map((pos, i) => (
            <Sphere key={`cliff-boulder-${i}`} args={[1, 14, 14]} position={pos as [number, number, number]}>
              <meshStandardMaterial color="#a1887f" />
            </Sphere>
          ))}
          {/* Grass patches */}
          {[[-2, 0.1, -6], [2, 0.1, -7], [0, 0.1, -9]].map((pos, i) => (
            <Box key={`cliff-grass-${i}`} args={[0.3, 0.05, 0.8]} position={pos as [number, number, number]}>
              <meshStandardMaterial color="#43a047" />
            </Box>
          ))}
          {/* Birds (simple spheres) */}
          {[[-3, 3, -15], [3, 3, -17]].map((pos, i) => (
            <Sphere key={`cliff-bird-${i}`} args={[0.18, 8, 8]} position={pos as [number, number, number]}>
              <meshStandardMaterial color="#fffde7" />
            </Sphere>
          ))}
          <Sphere args={[20, 32, 32]} position={[0, -5, -40]}>
            <meshStandardMaterial color="#8e44ad" emissive="#8e44ad" emissiveIntensity={0.2} />
          </Sphere>
        </>
      )}

      {/* Temple environment */}
      {environment === "temple" && (
        <>
          <Box args={[20, 0.2, 20]} position={[0, 0, -8]}>
            <meshStandardMaterial color={environmentColors.primary} />
          </Box>
          {/* Pillars */}
          {[-4, 4].map((x, i) => (
            <Cylinder key={i} args={[0.6, 0.6, 10, 16]} position={[x, 5, -8]}>
              <meshStandardMaterial color={environmentColors.accent} />
            </Cylinder>
          ))}
          {/* Altar */}
          <Box args={[10, 1, 10]} position={[0, 10, -8]}>
            <meshStandardMaterial color={environmentColors.secondary} />
          </Box>
          {/* Torches */}
          {[[-3, 1, -3], [3, 1, -3]].map((pos, i) => (
            <Cylinder key={`torch-${i}`} args={[0.1, 0.1, 2, 8]} position={pos as [number, number, number]}>
              <meshStandardMaterial color="#ffb300" />
            </Cylinder>
          ))}
          {/* Torch flames */}
          {[[-3, 2, -3], [3, 2, -3]].map((pos, i) => (
            <Sphere key={`torch-flame-${i}`} args={[0.18, 8, 8]} position={pos as [number, number, number]}>
              <meshStandardMaterial color="#ffeb3b" emissive="#ffeb3b" emissiveIntensity={0.8} />
            </Sphere>
          ))}
          <Sphere args={[1, 32, 32]} position={[0, 4, -8]}>
            <MeshDistortMaterial color="#9b59b6" distort={0.4} speed={3} emissive="#9b59b6" emissiveIntensity={0.5} />
          </Sphere>
        </>
      )}

      {/* Sunrise environment */}
      {environment === "sunrise" && (
        <>
          <Box args={[50, 0.2, 50]} position={[0, 0, -15]}>
            <meshStandardMaterial color="#2c1810" />
          </Box>
          {/* Sun */}
          <Sphere args={[8, 32, 32]} position={[0, 5, -30]}>
            <meshStandardMaterial color="#ff6b35" emissive="#ff6b35" emissiveIntensity={1} />
          </Sphere>
          {/* Clouds */}
          {[[-10, 8, -25], [10, 9, -28], [0, 7, -22]].map((pos, i) => (
            <Sphere key={`cloud-${i}`} args={[2.5, 16, 16]} position={pos as [number, number, number]}>
              <meshStandardMaterial color="#fffde7" transparent opacity={0.8} />
            </Sphere>
          ))}
          {/* Flowers */}
          {[[-5, 0.1, -10], [5, 0.1, -12], [0, 0.1, -18]].map((pos, i) => (
            <Sphere key={`sunrise-flower-${i}`} args={[0.18, 8, 8]} position={pos as [number, number, number]}>
              <meshStandardMaterial color="#ffd54f" />
            </Sphere>
          ))}
        </>
      )}
    </group>
    </>
  );
};
