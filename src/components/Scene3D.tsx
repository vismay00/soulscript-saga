import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Box, Cone, Cylinder, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { BoyCharacter } from "./BoyCharacter";

interface Scene3DProps {
  environment: "forest" | "ruins" | "gorge" | "cliff" | "temple" | "sanctum" | "garden" | "grove" | "meadow" | "clearing" | "cave" | "sunrise";
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
        return { primary: "#2d5016", secondary: "#689f38", accent: "#558b2f", ground: "#3e2723", sky: "#4a6741" };
      case "ruins":
        return { primary: "#ffcc02", secondary: "#ffa726", accent: "#ff8f00", ground: "#8d6e63", sky: "#ffe082" };
      case "gorge":
        return { primary: "#37474f", secondary: "#546e7a", accent: "#607d8b", ground: "#424242", sky: "#90a4ae" };
      case "cliff":
        return { primary: "#6d4c41", secondary: "#8d6e63", accent: "#a1887f", ground: "#5d4037", sky: "#bcaaa4" };
      case "temple":
        return { primary: "#ff6f00", secondary: "#f57c00", accent: "#e65100", ground: "#6d4c41", sky: "#ffcc80" };
      case "sanctum":
        return { primary: "#ffd700", secondary: "#ffb300", accent: "#ff8f00", ground: "#8d6e63", sky: "#fff3e0" };
      case "garden":
        return { primary: "#81c784", secondary: "#66bb6a", accent: "#4caf50", ground: "#795548", sky: "#c8e6c9" };
      case "grove":
        return { primary: "#3949ab", secondary: "#5c6bc0", accent: "#7986cb", ground: "#4a148c", sky: "#e8eaf6" };
      case "meadow":
        return { primary: "#7cb342", secondary: "#8bc34a", accent: "#9ccc65", ground: "#689f38", sky: "#dcedc8" };
      case "clearing":
        return { primary: "#b2dfdb", secondary: "#80cbc4", accent: "#4db6ac", ground: "#a1887f", sky: "#e0f2f1" };
      case "cave":
        return { primary: "#263238", secondary: "#37474f", accent: "#455a64", ground: "#212121", sky: "#90a4ae" };
      case "sunrise":
        return { primary: "#ffecb3", secondary: "#ffe082", accent: "#ffd54f", ground: "#bcaaa4", sky: "#fff8e1" };
      default:
        return { primary: "#2d5016", secondary: "#689f38", accent: "#558b2f", ground: "#3e2723", sky: "#4a6741" };
    }
  }, [environment]);

  return (
    <>
      <group ref={groupRef}>
        {/* Sky sphere */}
        <Sphere args={[100, 32, 32]} position={[0, 0, 0]}>
          <meshBasicMaterial color={environmentColors.sky} side={THREE.BackSide} />
        </Sphere>
        
        {/* Ambient lighting */}
        <ambientLight intensity={0.7} />
        
        {/* Main directional light */}
        <directionalLight position={[10, 20, 10]} intensity={1.5} color="#fffacd" castShadow />
        <directionalLight position={[-10, 15, -5]} intensity={0.6} color="#fff9e6" />
        
        {/* Environment-specific lighting */}
        {environment === "sanctum" && (
          <>
            <pointLight position={[0, 8, 0]} intensity={2} color="#ffd700" />
            <pointLight position={[-4, 4, -4]} intensity={1} color="#ffb300" />
            <pointLight position={[4, 4, -4]} intensity={1} color="#ffb300" />
          </>
        )}
        
        {environment === "temple" && (
          <>
            <pointLight position={[0, 6, 0]} intensity={1.5} color="#ff9800" />
            <pointLight position={[-3, 3, -3]} intensity={0.8} color="#ffb74d" />
            <pointLight position={[3, 3, -3]} intensity={0.8} color="#ffb74d" />
          </>
        )}

        {environment === "grove" && (
          <>
            <pointLight position={[0, 10, 0]} intensity={1.2} color="#9c27b0" />
            <pointLight position={[-5, 5, -5]} intensity={0.8} color="#ba68c8" />
          </>
        )}

        {/* Controllable character - appears in all environments */}
        <BoyCharacter />

        {/* Forest environment - mystical awakening */}
        {environment === "forest" && (
          <>
            {/* Mossy ground */}
            <Box args={[40, 0.3, 40]} position={[0, 0, -10]}>
              <meshStandardMaterial color={environmentColors.ground} />
            </Box>
            
            {/* Ancient trees */}
            {Array.from({ length: 10 }).map((_, i) => {
              const angle = Math.random() * Math.PI * 2;
              const radius = 15 + Math.random() * 8;
              const x = Math.cos(angle) * radius;
              const z = -10 + Math.sin(angle) * radius;
              const trunkHeight = 8 + Math.random() * 4;
              const trunkRadius = 0.4 + Math.random() * 0.2;
              const foliageHeight = 4 + Math.random() * 2;
              const foliageRadius = 2 + Math.random() * 1;
              return (
                <group key={`ancient-tree-${i}`} position={[x, 0, z]}>
                  <Cylinder args={[trunkRadius, trunkRadius, trunkHeight, 8]} position={[0, trunkHeight / 2, 0]}>
                    <meshStandardMaterial color="#3e2723" roughness={0.9} />
                  </Cylinder>
                  <Cone args={[foliageRadius, foliageHeight, 8]} position={[0, trunkHeight + foliageHeight / 2, 0]}>
                    <meshStandardMaterial color="#2e7d32" />
                  </Cone>
                </group>
              );
            })}

            {/* Mystical glowing moss patches */}
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = Math.random() * Math.PI * 2;
              const radius = 6 + Math.random() * 8;
              const x = Math.cos(angle) * radius;
              const z = -10 + Math.sin(angle) * radius;
              return (
                <Sphere key={`moss-${i}`} args={[0.8, 16, 16]} position={[x, 0.1, z]}>
                  <meshStandardMaterial color="#4caf50" emissive="#2e7d32" emissiveIntensity={0.3} />
                </Sphere>
              );
            })}

            {/* Floating light orbs (hints of magic) */}
            {Array.from({ length: 5 }).map((_, i) => {
              const angle = (i / 5) * Math.PI * 2;
              const radius = 12;
              const x = Math.cos(angle) * radius;
              const z = -10 + Math.sin(angle) * radius;
              const y = 3 + Math.sin(Date.now() * 0.001 + i) * 0.5;
              return (
                <Sphere key={`light-orb-${i}`} args={[0.2, 16, 16]} position={[x, y, z]}>
                  <meshStandardMaterial color="#81c784" emissive="#4caf50" emissiveIntensity={0.8} />
                </Sphere>
              );
            })}

            {/* Ancient standing stones */}
            {[[-8, 0, -8], [8, 0, -12], [0, 0, -18]].map((pos, i) => (
              <Cylinder key={`stone-${i}`} args={[0.6, 0.8, 3, 8]} position={pos as [number, number, number]} rotation={[0, Math.random() * Math.PI, 0.1]}>
                <meshStandardMaterial color="#616161" roughness={1} />
              </Cylinder>
            ))}
          </>
        )}

        {/* Ruins environment - ancient archway */}
        {environment === "ruins" && (
          <>
            {/* Ground with scattered stones */}
            <Box args={[35, 0.2, 35]} position={[0, 0, -10]}>
              <meshStandardMaterial color={environmentColors.ground} />
            </Box>

            {/* Main archway */}
            <group position={[0, 0, -15]}>
              {/* Left pillar */}
              <Cylinder args={[1.2, 1.5, 8, 12]} position={[-4, 4, 0]}>
                <meshStandardMaterial color="#ffb74d" roughness={0.8} />
              </Cylinder>
              {/* Right pillar */}
              <Cylinder args={[1.2, 1.5, 8, 12]} position={[4, 4, 0]}>
                <meshStandardMaterial color="#ffb74d" roughness={0.8} />
              </Cylinder>
              {/* Archway top */}
              <Box args={[10, 1.5, 2]} position={[0, 8.5, 0]}>
                <meshStandardMaterial color="#ffa726" roughness={0.7} />
              </Box>
            </group>

            {/* Glowing runes on pillars */}
            {[[-4, 6, -15], [4, 6, -15]].map((pos, i) => (
              <Sphere key={`rune-${i}`} args={[0.3, 16, 16]} position={pos as [number, number, number]}>
                <meshStandardMaterial color="#ffcc02" emissive="#ff8f00" emissiveIntensity={0.6} />
              </Sphere>
            ))}

            {/* Scattered ancient blocks */}
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = Math.random() * Math.PI * 2;
              const radius = 8 + Math.random() * 12;
              const x = Math.cos(angle) * radius;
              const z = -10 + Math.sin(angle) * radius;
              const size = 0.8 + Math.random() * 1.2;
              return (
                <Box key={`ruin-block-${i}`} args={[size, size * 0.6, size]} position={[x, size * 0.3, z]} rotation={[0, Math.random() * Math.PI, 0]}>
                  <meshStandardMaterial color="#d7ccc8" roughness={0.9} />
                </Box>
              );
            })}

            {/* Elder figure (simple representation) */}
            <group position={[0, 0.9, -15]}>
              {/* Head */}
              <Sphere args={[0.35, 12, 12]} position={[0, 0.8, 0]}>
                <meshStandardMaterial color="#ffe0b2" />
              </Sphere>
              {/* Glowing robes */}
              <Cone args={[0.6, 1.8, 8]} position={[0, 0, 0]}>
                <meshStandardMaterial color="#fff9c4" emissive="#ffeb3b" emissiveIntensity={0.3} />
              </Cone>
            </group>
          </>
        )}

        {/* Gorge environment - misty depths */}
        {environment === "gorge" && (
          <>
            {/* Gorge walls */}
            <Box args={[40, 20, 5]} position={[-15, 10, -10]}>
              <meshStandardMaterial color={environmentColors.primary} />
            </Box>
            <Box args={[40, 20, 5]} position={[15, 10, -10]}>
              <meshStandardMaterial color={environmentColors.primary} />
            </Box>

            {/* Misty ground */}
            <Box args={[30, 0.3, 40]} position={[0, 0, -10]}>
              <meshStandardMaterial color={environmentColors.ground} />
            </Box>

            {/* Mist effects (translucent spheres) */}
            {Array.from({ length: 15 }).map((_, i) => {
              const x = (Math.random() - 0.5) * 25;
              const y = Math.random() * 8;
              const z = -20 + Math.random() * 20;
              const size = 1 + Math.random() * 2;
              return (
                <Sphere key={`mist-${i}`} args={[size, 12, 12]} position={[x, y, z]}>
                  <meshStandardMaterial color="#eceff1" transparent opacity={0.3} />
                </Sphere>
              );
            })}

            {/* Ancient wooden bridge */}
            <group position={[0, 1, -10]}>
              {/* Bridge deck */}
              <Box args={[12, 0.3, 2]} position={[0, 0, 0]}>
                <meshStandardMaterial color="#8d6e63" roughness={0.9} />
              </Box>
              {/* Bridge supports */}
              <Cylinder args={[0.1, 0.1, 2, 8]} position={[-5, -1, 0]}>
                <meshStandardMaterial color="#6d4c41" />
              </Cylinder>
              <Cylinder args={[0.1, 0.1, 2, 8]} position={[5, -1, 0]}>
                <meshStandardMaterial color="#6d4c41" />
              </Cylinder>
            </group>

            {/* Mysterious glowing eyes in the mist */}
            {[[-8, 3, -15], [10, 4, -18], [-12, 2, -12]].map((pos, i) => (
              <Sphere key={`eyes-${i}`} args={[0.15, 8, 8]} position={pos as [number, number, number]}>
                <meshStandardMaterial color="#e91e63" emissive="#e91e63" emissiveIntensity={0.8} />
              </Sphere>
            ))}
          </>
        )}

        {/* Cliff environment - mountain ascent */}
        {environment === "cliff" && (
          <>
            {/* Cliff platform */}
            <Box args={[20, 1, 15]} position={[0, 0, -5]}>
              <meshStandardMaterial color={environmentColors.primary} />
            </Box>

            {/* Mountain backdrop */}
            {[-8, 0, 8].map((x, i) => (
              <Cone key={`mountain-${i}`} args={[4 + i, 15 + i * 2, 8]} position={[x, 7.5 + i, -20]}>
                <meshStandardMaterial color="#8d6e63" />
              </Cone>
            ))}

            {/* Temple structure in distance */}
            <group position={[0, 2, -18]}>
              {/* Temple base */}
              <Box args={[6, 3, 4]} position={[0, 1.5, 0]}>
                <meshStandardMaterial color="#ff8f00" />
              </Box>
              {/* Temple pillars */}
              <Cylinder args={[0.3, 0.3, 4, 8]} position={[-2, 2, 2]}>
                <meshStandardMaterial color="#ffa726" />
              </Cylinder>
              <Cylinder args={[0.3, 0.3, 4, 8]} position={[2, 2, 2]}>
                <meshStandardMaterial color="#ffa726" />
              </Cylinder>
              {/* Temple glow */}
              <Sphere args={[0.8, 16, 16]} position={[0, 3.5, 0]}>
                <meshStandardMaterial color="#ffcc02" emissive="#ff8f00" emissiveIntensity={0.5} />
              </Sphere>
            </group>

            {/* Rocky outcrops */}
            {Array.from({ length: 6 }).map((_, i) => {
              const angle = Math.random() * Math.PI * 2;
              const radius = 6 + Math.random() * 8;
              const x = Math.cos(angle) * radius;
              const z = -8 + Math.sin(angle) * radius;
              const size = 0.8 + Math.random() * 1;
              return (
                <Sphere key={`rock-${i}`} args={[size, 10, 10]} position={[x, size * 0.5, z]}>
                  <meshStandardMaterial color="#795548" roughness={1} />
                </Sphere>
              );
            })}
          </>
        )}

        {/* Temple environment - sacred halls */}
        {environment === "temple" && (
          <>
            {/* Temple floor */}
            <Box args={[25, 0.3, 25]} position={[0, 0, -8]}>
              <meshStandardMaterial color={environmentColors.ground} />
            </Box>

            {/* Grand pillars */}
            {[-6, -2, 2, 6].map((x, i) => (
              <Cylinder key={`pillar-${i}`} args={[0.8, 0.8, 12, 16]} position={[x, 6, -8]}>
                <meshStandardMaterial color={environmentColors.accent} roughness={0.6} />
              </Cylinder>
            ))}

            {/* Temple ceiling */}
            <Box args={[25, 1, 25]} position={[0, 12, -8]}>
              <meshStandardMaterial color={environmentColors.secondary} />
            </Box>

            {/* Sacred braziers */}
            {[[-4, 1.5, -4], [4, 1.5, -4], [-4, 1.5, -12], [4, 1.5, -12]].map((pos, i) => (
              <group key={`brazier-${i}`} position={pos as [number, number, number]}>
                <Cylinder args={[0.4, 0.5, 1, 8]} position={[0, 0, 0]}>
                  <meshStandardMaterial color="#8d6e63" />
                </Cylinder>
                <Sphere args={[0.3, 12, 12]} position={[0, 0.8, 0]}>
                  <meshStandardMaterial color="#ff5722" emissive="#ff5722" emissiveIntensity={0.7} />
                </Sphere>
              </group>
            ))}

            {/* Ancient murals (represented as glowing rectangles) */}
            {[[-12, 4, -8], [12, 4, -8]].map((pos, i) => (
              <Box key={`mural-${i}`} args={[0.1, 6, 4]} position={pos as [number, number, number]}>
                <meshStandardMaterial color="#ffb74d" emissive="#ff8f00" emissiveIntensity={0.2} />
              </Box>
            ))}
          </>
        )}

        {/* Sanctum environment - final choice chamber */}
        {environment === "sanctum" && (
          <>
            {/* Sacred floor with intricate patterns */}
            <Cylinder args={[12, 12, 0.4, 32]} position={[0, 0, -8]}>
              <meshStandardMaterial color={environmentColors.ground} />
            </Cylinder>

            {/* Crystal altar (left choice) */}
            <group position={[-4, 0, -8]}>
              <Cylinder args={[1.5, 1.5, 2, 8]} position={[0, 1, 0]}>
                <meshStandardMaterial color="#e1f5fe" />
              </Cylinder>
              <Cone args={[0.5, 1.5, 6]} position={[0, 3, 0]}>
                <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={0.8} />
              </Cone>
            </group>

            {/* Flame altar (right choice) */}
            <group position={[4, 0, -8]}>
              <Cylinder args={[1.5, 1.5, 2, 8]} position={[0, 1, 0]}>
                <meshStandardMaterial color="#ffecb3" />
              </Cylinder>
              <Sphere args={[0.6, 16, 16]} position={[0, 3, 0]}>
                <MeshDistortMaterial color="#ff5722" distort={0.4} speed={2} emissive="#ff5722" emissiveIntensity={0.9} />
              </Sphere>
            </group>

            {/* Surrounding light columns */}
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i / 8) * Math.PI * 2;
              const radius = 10;
              const x = Math.cos(angle) * radius;
              const z = -8 + Math.sin(angle) * radius;
              return (
                <Cylinder key={`light-column-${i}`} args={[0.3, 0.3, 8, 8]} position={[x, 4, z]}>
                  <meshStandardMaterial color="#fff9c4" emissive="#ffeb3b" emissiveIntensity={0.5} />
                </Cylinder>
              );
            })}

            {/* Mystical energy swirls */}
            <Sphere args={[2, 32, 32]} position={[0, 6, -8]}>
              <MeshDistortMaterial color="#9c27b0" distort={0.6} speed={1.5} emissive="#9c27b0" emissiveIntensity={0.4} transparent opacity={0.7} />
            </Sphere>
          </>
        )}

        {/* Garden environment - silver flowers after bridge */}
        {environment === "garden" && (
          <>
            {/* Garden ground */}
            <Box args={[30, 0.2, 30]} position={[0, 0, -10]}>
              <meshStandardMaterial color={environmentColors.ground} />
            </Box>

            {/* Silver flowers */}
            {Array.from({ length: 20 }).map((_, i) => {
              const angle = Math.random() * Math.PI * 2;
              const radius = 5 + Math.random() * 10;
              const x = Math.cos(angle) * radius;
              const z = -10 + Math.sin(angle) * radius;
              return (
                <group key={`silver-flower-${i}`} position={[x, 0, z]}>
                  <Cylinder args={[0.02, 0.02, 0.8, 8]} position={[0, 0.4, 0]}>
                    <meshStandardMaterial color="#4caf50" />
                  </Cylinder>
                  <Sphere args={[0.2, 12, 12]} position={[0, 0.8, 0]}>
                    <meshStandardMaterial color="#eceff1" emissive="#cfd8dc" emissiveIntensity={0.4} />
                  </Sphere>
                </group>
              );
            })}

            {/* Hidden stair */}
            {Array.from({ length: 8 }).map((_, i) => (
              <Box key={`stair-${i}`} args={[4, 0.3, 1]} position={[0, i * 0.3, -15 - i]}>
                <meshStandardMaterial color="#8d6e63" />
              </Box>
            ))}

            {/* Gentle waterfalls */}
            {[[-8, 4, -20], [8, 4, -20]].map((pos, i) => (
              <Box key={`waterfall-${i}`} args={[0.5, 8, 0.2]} position={pos as [number, number, number]}>
                <meshStandardMaterial color="#4fc3f7" transparent opacity={0.6} />
              </Box>
            ))}
          </>
        )}

        {/* Grove environment - moonlit mystery */}
        {environment === "grove" && (
          <>
            {/* Grove ground */}
            <Cylinder args={[15, 15, 0.3, 32]} position={[0, 0, -8]}>
              <meshStandardMaterial color={environmentColors.ground} />
            </Cylinder>

            {/* Moonlight beam */}
            <Cylinder args={[0.1, 8, 20, 16]} position={[0, 10, -8]} rotation={[0, 0, 0]}>
              <meshStandardMaterial color="#e8eaf6" transparent opacity={0.3} />
            </Cylinder>

            {/* Mystical trees in circle */}
            {Array.from({ length: 6 }).map((_, i) => {
              const angle = (i / 6) * Math.PI * 2;
              const radius = 12;
              const x = Math.cos(angle) * radius;
              const z = -8 + Math.sin(angle) * radius;
              return (
                <group key={`grove-tree-${i}`} position={[x, 0, z]}>
                  <Cylinder args={[0.6, 0.6, 8, 8]} position={[0, 4, 0]}>
                    <meshStandardMaterial color="#4a148c" />
                  </Cylinder>
                  <Sphere args={[2, 16, 16]} position={[0, 8.5, 0]}>
                    <meshStandardMaterial color="#7986cb" emissive="#5c6bc0" emissiveIntensity={0.3} />
                  </Sphere>
                </group>
              );
            })}

            {/* Floating destiny symbols */}
            {Array.from({ length: 5 }).map((_, i) => {
              const angle = (i / 5) * Math.PI * 2;
              const radius = 4;
              const x = Math.cos(angle) * radius;
              const z = -8 + Math.sin(angle) * radius;
              const y = 2 + Math.sin(Date.now() * 0.002 + i) * 0.8;
              return (
                <Sphere key={`symbol-${i}`} args={[0.3, 12, 12]} position={[x, y, z]}>
                  <meshStandardMaterial color="#ba68c8" emissive="#9c27b0" emissiveIntensity={0.7} />
                </Sphere>
              );
            })}
          </>
        )}

        {/* Meadow environment - freedom ending */}
        {environment === "meadow" && (
          <>
            {/* Rolling meadow ground */}
            <Box args={[60, 0.5, 60]} position={[0, 0, -15]}>
              <meshStandardMaterial color={environmentColors.primary} />
            </Box>

            {/* Distant horizon */}
            <Sphere args={[30, 32, 32]} position={[0, -10, -50]}>
              <meshStandardMaterial color="#81c784" />
            </Sphere>

            {/* Wildflowers everywhere */}
            {Array.from({ length: 30 }).map((_, i) => {
              const x = (Math.random() - 0.5) * 50;
              const z = -30 + Math.random() * 40;
              const color = ['#f8bbd9', '#ffccbc', '#fff9c4', '#e1f5fe'][Math.floor(Math.random() * 4)];
              return (
                <Sphere key={`wildflower-${i}`} args={[0.15, 8, 8]} position={[x, 0.1, z]}>
                  <meshStandardMaterial color={color} />
                </Sphere>
              );
            })}

            {/* Path leading to infinity */}
            <Box args={[2, 0.1, 60]} position={[0, 0.05, -15]}>
              <meshStandardMaterial color="#8d6e63" />
            </Box>

            {/* Freedom birds */}
            {Array.from({ length: 8 }).map((_, i) => {
              const x = (Math.random() - 0.5) * 40;
              const y = 8 + Math.random() * 5;
              const z = -20 + Math.random() * 30;
              return (
                <Sphere key={`bird-${i}`} args={[0.2, 8, 8]} position={[x, y, z]}>
                  <meshStandardMaterial color="#ffffff" />
                </Sphere>
              );
            })}
          </>
        )}
      </group>
    </>
  );
};
