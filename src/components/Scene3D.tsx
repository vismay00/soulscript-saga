import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Box, Cone, Cylinder, MeshDistortMaterial, Stars } from "@react-three/drei";
import * as THREE from "three";

interface Scene3DProps {
  environment: "forest" | "clearing" | "cave" | "cliff" | "temple" | "sunrise";
}

export const Scene3D = ({ environment }: Scene3DProps) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  const environmentColors = useMemo(() => {
    switch (environment) {
      case "forest":
        return { primary: "#1a472a", secondary: "#2d5a3d", accent: "#4a7c59" };
      case "clearing":
        return { primary: "#2a4a7c", secondary: "#3d5a8f", accent: "#5a7ca2" };
      case "cave":
        return { primary: "#1a1a2e", secondary: "#16213e", accent: "#2d3561" };
      case "cliff":
        return { primary: "#2e1a47", secondary: "#3e2d5a", accent: "#5a4a7c" };
      case "temple":
        return { primary: "#472e1a", secondary: "#5a3e2d", accent: "#7c5a4a" };
      case "sunrise":
        return { primary: "#ff6b35", secondary: "#f7931e", accent: "#ffaa00" };
      default:
        return { primary: "#1a472a", secondary: "#2d5a3d", accent: "#4a7c59" };
    }
  }, [environment]);

  return (
    <group ref={groupRef}>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      {/* Ambient light */}
      <ambientLight intensity={0.3} />
      
      {/* Main directional light */}
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      {/* Environment-specific lighting */}
      {environment === "sunrise" && (
        <>
          <pointLight position={[0, 5, -10]} intensity={2} color="#ff6b35" />
          <pointLight position={[-5, 3, -8]} intensity={1} color="#f7931e" />
        </>
      )}
      
      {environment === "temple" && (
        <>
          <pointLight position={[0, 8, 0]} intensity={1.5} color="#9b59b6" />
          <pointLight position={[-4, 4, -4]} intensity={0.8} color="#3498db" />
        </>
      )}

      {/* Forest environment */}
      {environment === "forest" && (
        <>
          {[-5, -2, 2, 5].map((x, i) => (
            <group key={i} position={[x, 0, -5 - i * 2]}>
              <Cylinder args={[0.3, 0.4, 6, 8]} position={[0, 3, 0]}>
                <meshStandardMaterial color={environmentColors.primary} />
              </Cylinder>
              <Cone args={[1.5, 3, 8]} position={[0, 6.5, 0]}>
                <meshStandardMaterial color={environmentColors.accent} />
              </Cone>
            </group>
          ))}
          <Box args={[30, 0.2, 30]} position={[0, 0, -10]}>
            <meshStandardMaterial color="#0d2818" />
          </Box>
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
