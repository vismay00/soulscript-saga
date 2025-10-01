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
          
          {/* Small bushes scattered around */}
          {[
            [-6, 0, -8], [-3, 0, -12], [4, 0, -7], [6, 0, -14], 
            [-8, 0, -15], [2, 0, -18], [-4, 0, -20], [7, 0, -19]
          ].map((pos, i) => (
            <Sphere key={`bush-${i}`} args={[0.6, 16, 16]} position={pos as [number, number, number]}>
              <meshStandardMaterial color={environmentColors.primary} roughness={0.8} />
            </Sphere>
          ))}
          
          {/* Small huts */}
          {[[-5, 0, -10], [5, 0, -12], [0, 0, -18]].map((pos, i) => (
            <group key={`hut-${i}`} position={pos as [number, number, number]}>
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
          ))}
          
          {/* Trees in background */}
          {[-10, -7, 7, 10].map((x, i) => (
            <group key={`tree-${i}`} position={[x, 0, -25 - i * 2]}>
              <Cylinder args={[0.3, 0.4, 6, 8]} position={[0, 3, 0]}>
                <meshStandardMaterial color={environmentColors.secondary} />
              </Cylinder>
              <Cone args={[1.5, 3, 8]} position={[0, 6.5, 0]}>
                <meshStandardMaterial color={environmentColors.accent} />
              </Cone>
            </group>
          ))}
        </>
      )}

      {/* Clearing environment */}
      {environment === "clearing" && (
        <>
          <Box args={[40, 0.2, 40]} position={[0, 0, -10]}>
            <meshStandardMaterial color={environmentColors.primary} />
          </Box>
          {[0, 1, 2, 3, 4].map((i) => (
            <Sphere key={i} args={[0.5, 32, 32]} position={[Math.cos(i) * 6, 2 + Math.sin(i * 2) * 0.5, -8 + Math.sin(i) * 6]}>
              <MeshDistortMaterial color={environmentColors.accent} distort={0.3} speed={2} />
            </Sphere>
          ))}
        </>
      )}

      {/* Cave environment */}
      {environment === "cave" && (
        <>
          <Box args={[30, 15, 30]} position={[0, 7, -10]}>
            <meshStandardMaterial color={environmentColors.primary} side={THREE.BackSide} />
          </Box>
          {[0, 1, 2].map((i) => (
            <Cone key={i} args={[1, 4, 8]} position={[i * 4 - 4, 14, -10 + i * 3]} rotation={[Math.PI, 0, 0]}>
              <meshStandardMaterial color={environmentColors.secondary} />
            </Cone>
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
          {[-4, 4].map((x, i) => (
            <Cylinder key={i} args={[0.6, 0.6, 10, 16]} position={[x, 5, -8]}>
              <meshStandardMaterial color={environmentColors.accent} />
            </Cylinder>
          ))}
          <Box args={[10, 1, 10]} position={[0, 10, -8]}>
            <meshStandardMaterial color={environmentColors.secondary} />
          </Box>
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
          <Sphere args={[8, 32, 32]} position={[0, 5, -30]}>
            <meshStandardMaterial color="#ff6b35" emissive="#ff6b35" emissiveIntensity={1} />
          </Sphere>
        </>
      )}
    </group>
  );
};
