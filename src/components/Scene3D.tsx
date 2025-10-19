import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Box, Cone, Cylinder, MeshDistortMaterial, Plane } from "@react-three/drei";
import * as THREE from "three";
import { BoyCharacter } from "./BoyCharacter";
import { Scene } from "@/types/story";

// Define the new environment types based on the story scenes
interface Scene3DProps {
  // Use the canonical environment union from the Scene type so this stays in sync
  environment: Scene["environment"];
}

export const Scene3D = ({ environment }: Scene3DProps) => {
  const groupRef = useRef<THREE.Group>(null);
  // For the glowing water animation. Use a relaxed type because Drei's
  // MeshDistortMaterial is a React component and its runtime material shape
  // can be a ShaderMaterial with different fields. We'll treat it as `any`
  // when animating to avoid incorrect TypeScript assumptions.
  const waterRef = useRef<THREE.Mesh | null>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Gentle rotation for a 'drifting' feeling
      groupRef.current.rotation.y += 0.0005;
    }
    
    // Animate the water distortion for the glowing sea (best-effort).
    if (waterRef.current) {
      const mat: any = (waterRef.current.material as any) || null;
      // MeshDistortMaterial may expose a `uniforms.time` (ShaderMaterial) or
      // might track `time` differently. Update whichever is present.
      if (mat) {
        if (mat.uniforms && mat.uniforms.time) {
          mat.uniforms.time.value = clock.getElapsedTime() * 0.5;
        } else if (typeof mat.time !== "undefined") {
          mat.time = clock.getElapsedTime() * 0.5;
        }
      }
    }
  });

  const environmentColors = useMemo(() => {
    // Colors are themed around the "glowing ocean beneath an endless night sky"
  switch (environment) {
      case "ship":
        return { primary: "#0b0c10", secondary: "#1f2833", accent: "#66fcf1", ground: "#337a72", sky: "#04040a" }; // Night, weathered wood, starlight glow
      case "cabin":
        return { primary: "#4e342e", secondary: "#795548", accent: "#ffeb3b", ground: "#212121", sky: "#121212" }; // Dim, wood/ink smell, old gold glow
      case "beach":
        return { primary: "#2c3e50", secondary: "#ecf0f1", accent: "#3498db", ground: "#f7f9f9", sky: "#0b0b18" }; // Glowing sand, deep night sky
      case "altar":
        return { primary: "#5d3587", secondary: "#9c27b0", accent: "#ff00ff", ground: "#1f003a", sky: "#0a001a" }; // Deep purple, memory pool
      case "sky":
        return { primary: "#ffd700", secondary: "#ffeb3b", accent: "#ff0066", ground: "#000000", sky: "#4a148c" }; // Golden path, cosmic purple sky
      case "ocean":
        return { primary: "#1976d2", secondary: "#0d47a1", accent: "#4fc3f7", ground: "#011a33", sky: "#011a33" }; // Deep blue, memory depths
      case "desert":
        return { primary: "#c79c6a", secondary: "#e8cfae", accent: "#ffd38a", ground: "#e3b97a", sky: "#ffefc2" }; // Warm sand, sun-bleached
      default:
        return { primary: "#0b0c10", secondary: "#1f2833", accent: "#66fcf1", ground: "#337a72", sky: "#04040a" };
    }
  }, [environment]);

  // Define a reusable Starlit Sea component for common environments
  const StarlitSea = useMemo(() => {
    const seaColor = environmentColors.primary;
    const glowColor = environmentColors.accent;
    return (
        <Plane args={[100, 100]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow ref={waterRef}>
            <MeshDistortMaterial
                color={seaColor}
                distort={0.5} // Amount of wave distortion
                speed={1.5}  // Speed of distortion
                emissive={glowColor}
                emissiveIntensity={environment === "ship" || environment === "beach" ? 1.5 : 0.5}
            />
        </Plane>
    );
  }, [environmentColors, environment]);
  
  return (
    <>
      <group ref={groupRef}>
        {/* Sky sphere (The endless night sky) */}
        <Sphere args={[100, 32, 32]} position={[0, 0, 0]}>
          <meshBasicMaterial color={environmentColors.sky} side={THREE.BackSide} />
        </Sphere>
        
        {/* Ambient lighting */}
        <ambientLight intensity={0.5} color={environmentColors.accent} />
        
        {/* Main starlight/moonlight */}
        <directionalLight position={[10, 30, 10]} intensity={1.5} color="#d4eaf7" castShadow />
        <directionalLight position={[-10, 15, -5]} intensity={0.8} color="#99a8b2" />
        
        {/* Glowing Water/Ground Plane for most scenes */}
        {environment !== "sky" && environment !== "ocean" && (
            <>
                {StarlitSea}
            </>
        )}
        
        {/* Environment-specific lighting */}
        {environment === "ship" && (
          // Blue-green glow from the water
          <pointLight position={[0, -5, 0]} intensity={2} color="#66fcf1" />
        )}
        
        {environment === "altar" && (
          // Purple/Pink glow from the Tide Altar
          <pointLight position={[0, 5, 0]} intensity={3} color="#ff00ff" />
        )}
        
        {environment === "sky" && (
          // Intense golden light for the freedom path
          <>
            <directionalLight position={[0, 40, 0]} intensity={5} color="#ffd700" />
            <pointLight position={[0, 10, 0]} intensity={3} color="#ffeb3b" />
          </>
        )}
        
        {environment === "ocean" && (
          // Deep water lighting
          <>
            <pointLight position={[0, 0, 0]} intensity={0.5} color="#4fc3f7" />
            <ambientLight intensity={0.1} color="#0d47a1" />
          </>
        )}

        {/* Controllable character - appears in all environments */}
        <BoyCharacter />

        {/* SHIP environment - The Drifting Deck */}
        {environment === "ship" && (
          <>
            {/* Ship Deck (simple box) */}
            <Box args={[10, 1.5, 20]} position={[0, 0.75, 0]}>
              <meshStandardMaterial color={environmentColors.secondary} roughness={0.9} />
            </Box>
            
            {/* Captain's Cabin Structure (partially) */}
            <Box args={[4, 4, 4]} position={[0, 3.5, -7]}>
              <meshStandardMaterial color={environmentColors.primary} roughness={0.9} />
            </Box>

            {/* Mast/Sail (simple vertical cylinder) */}
            <Cylinder args={[0.3, 0.3, 15, 8]} position={[0, 8.25, 0]}>
                <meshStandardMaterial color="#8d6e63" />
            </Cylinder>
          </>
        )}

        {/* CABIN environment - Captain’s Memory */}
        {environment === "cabin" && (
          <>
            {/* Walls and Floor */}
            <Box args={[15, 8, 15]} position={[0, 4, -8]}>
              <meshStandardMaterial color={environmentColors.primary} side={THREE.BackSide} />
            </Box>
            
            {/* Captain's Table */}
            <Cylinder args={[2, 2, 1, 6]} position={[0, 0.5, -4]}>
              <meshStandardMaterial color={environmentColors.secondary} />
            </Cylinder>
            
            {/* Glowing Map on the table */}
            <Box args={[1, 0.1, 1]} position={[0, 1, -4]} rotation={[-Math.PI / 2, 0, 0]}>
              <meshStandardMaterial color={environmentColors.accent} emissive={environmentColors.accent} emissiveIntensity={1.5} />
            </Box>
          </>
        )}

        {/* BEACH environment - Shore of Stars */}
        {environment === "beach" && (
          <>
            {/* Star Sand Shore (simple plane) */}
            <Plane args={[40, 40]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
                <meshStandardMaterial color={environmentColors.ground} emissive={environmentColors.accent} emissiveIntensity={0.8} />
            </Plane>
            
            {/* Distant Ship (simple representation) */}
            <Box args={[8, 1, 15]} position={[10, 0.5, -20]}>
              <meshStandardMaterial color="#1f2833" roughness={0.9} />
            </Box>
            
            {/* Star grains/particles */}
            {Array.from({ length: 30 }).map((_, i) => {
                const x = (Math.random() - 0.5) * 30;
                const z = (Math.random() - 0.5) * 30;
                return (
                    <Sphere key={`star-sand-${i}`} args={[0.05, 8, 8]} position={[x, 0.1, z]}>
                        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
                    </Sphere>
                );
            })}
          </>
        )}

        {/* DESERT environment - Sand and Dunes */}
        {environment === "desert" && (
          <>
            {/* Large sand plane */}
            <Plane args={[100, 100]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
              <meshStandardMaterial color={environmentColors.ground} roughness={1} metalness={0} />
            </Plane>

            {/* A few dunes (simple cones) */}
            {[
              { pos: [-10, 1, -10], scale: 3 },
              { pos: [8, 0.8, -6], scale: 2.2 },
              { pos: [0, 1.2, -18], scale: 3.8 },
            ].map((d, i) => (
              <Cone key={`dune-${i}`} args={[d.scale * 2, d.scale * 2, 16]} position={d.pos as any} rotation={[-Math.PI, 0, 0]}>
                <meshStandardMaterial color={environmentColors.secondary} roughness={1} />
              </Cone>
            ))}

            {/* Warm sun light */}
            <directionalLight position={[30, 50, 10]} intensity={1.6} color={environmentColors.accent} />
            <ambientLight intensity={0.4} color={environmentColors.accent} />
          </>
        )}

        {/* ALTAR environment - The Tide Altar */}
        {environment === "altar" && (
          <>
            {/* Central Glowing Pool (Sphere slightly below surface) */}
            <Sphere args={[4, 32, 32]} position={[0, -0.2, 0]}>
                <meshStandardMaterial color={environmentColors.accent} emissive={environmentColors.accent} emissiveIntensity={2} transparent opacity={0.6} />
            </Sphere>
            
            {/* Stone Pillars around the pool */}
            {Array.from({ length: 6 }).map((_, i) => {
                const angle = (i / 6) * Math.PI * 2;
                const radius = 8;
                const x = Math.cos(angle) * radius;
                const z = Math.sin(angle) * radius;
                return (
                    <Cylinder key={`pillar-${i}`} args={[1, 1, 10, 8]} position={[x, 4.5, z]}>
                        <meshStandardMaterial color={environmentColors.secondary} roughness={0.9} />
                    </Cylinder>
                );
            })}
          </>
        )}

        {/* STARPATH / SKY environment - Path of Light */}
        {environment === "sky" && (
          <>
            {/* Golden Bridge of Light */}
            <Box args={[5, 0.2, 50]} position={[0, 0, -25]}>
                <meshStandardMaterial color={environmentColors.primary} emissive={environmentColors.primary} emissiveIntensity={1} />
            </Box>

            {/* Distant Stars (small, bright spheres) */}
            {Array.from({ length: 50 }).map((_, i) => {
                const x = (Math.random() - 0.5) * 60;
                const y = (Math.random() - 0.5) * 60;
                const z = -60 + Math.random() * 40;
                return (
                    <Sphere key={`star-${i}`} args={[0.1, 8, 8]} position={[x, y, z]}>
                        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1} />
                    </Sphere>
                );
            })}
            
            {/* Celestial Guardian symbol (simple torus) */}
            <group position={[0, 10, -40]}>
                <Sphere args={[2, 32, 32]}>
                    <MeshDistortMaterial color="#ffd700" distort={0.5} speed={1} emissive="#ffeb3b" emissiveIntensity={0.8} transparent opacity={0.9} />
                </Sphere>
            </group>
          </>
        )}

        {/* DEPTHS / OCEAN environment - The Sea Below */}
        {environment === "ocean" && (
          <>
            {/* Endless Dark Water (Large Distorted Sphere with backface rendering) */}
            <Sphere args={[50, 64, 64]} position={[0, 0, 0]}>
                <MeshDistortMaterial
                    color={environmentColors.primary}
                    distort={0.8}
                    speed={0.5}
                    emissive={environmentColors.accent}
                    emissiveIntensity={0.2}
                    side={THREE.DoubleSide}
                />
            </Sphere>

            {/* Floating Echoes/Souls (shimmering spheres) */}
            {Array.from({ length: 20 }).map((_, i) => {
                const x = (Math.random() - 0.5) * 20;
                const y = (Math.random() - 0.5) * 15;
                const z = (Math.random() - 0.5) * 20;
                return (
                    <Sphere key={`echo-${i}`} args={[0.2 + Math.random() * 0.3, 16, 16]} position={[x, y, z]}>
                        <meshStandardMaterial color="#e0f7fa" emissive="#4fc3f7" emissiveIntensity={0.5} transparent opacity={0.7} />
                    </Sphere>
                );
            })}
          </>
        )}
      </group>
    </>
  );
};