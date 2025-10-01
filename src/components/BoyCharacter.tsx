import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Cylinder } from "@react-three/drei";
import * as THREE from "three";

interface BoyCharacterProps {
  onPositionChange?: (position: THREE.Vector3) => void;
}

export const BoyCharacter = ({ onPositionChange }: BoyCharacterProps) => {
  const boyRef = useRef<THREE.Group>(null);
  const [keys, setKeys] = useState({
    w: false,
    a: false,
    s: false,
    d: false,
    ArrowUp: false,
    ArrowLeft: false,
    ArrowDown: false,
    ArrowRight: false,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key in keys) {
        setKeys((prev) => ({ ...prev, [e.key]: true }));
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key in keys) {
        setKeys((prev) => ({ ...prev, [e.key]: false }));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useFrame((state) => {
    if (!boyRef.current) return;

    const speed = 0.1;
    const moveVector = new THREE.Vector3(0, 0, 0);

    // Handle movement
    if (keys.w || keys.ArrowUp) moveVector.z -= speed;
    if (keys.s || keys.ArrowDown) moveVector.z += speed;
    if (keys.a || keys.ArrowLeft) moveVector.x -= speed;
    if (keys.d || keys.ArrowRight) moveVector.x += speed;

    if (moveVector.length() > 0) {
      boyRef.current.position.add(moveVector);
      
      // Rotate to face movement direction
      const angle = Math.atan2(moveVector.x, moveVector.z);
      boyRef.current.rotation.y = angle;
      
      // Add walking bounce animation
      boyRef.current.position.y = 1 + Math.abs(Math.sin(state.clock.elapsedTime * 10)) * 0.2;
      
      // Constrain to play area
      boyRef.current.position.x = Math.max(-15, Math.min(15, boyRef.current.position.x));
      boyRef.current.position.z = Math.max(-25, Math.min(-3, boyRef.current.position.z));
      
      onPositionChange?.(boyRef.current.position);
    } else {
      // Idle animation
      boyRef.current.position.y = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <group ref={boyRef} position={[0, 1, -8]}>
      {/* Head */}
      <Sphere args={[0.3, 16, 16]} position={[0, 0.8, 0]}>
        <meshStandardMaterial color="#ffdbac" />
      </Sphere>
      
      {/* Body */}
      <Cylinder args={[0.25, 0.3, 0.8, 16]} position={[0, 0.2, 0]}>
        <meshStandardMaterial color="#2196f3" />
      </Cylinder>
      
      {/* Arms */}
      <Cylinder args={[0.1, 0.1, 0.6, 8]} position={[-0.4, 0.3, 0]} rotation={[0, 0, Math.PI / 4]}>
        <meshStandardMaterial color="#ffdbac" />
      </Cylinder>
      <Cylinder args={[0.1, 0.1, 0.6, 8]} position={[0.4, 0.3, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <meshStandardMaterial color="#ffdbac" />
      </Cylinder>
      
      {/* Legs */}
      <Cylinder args={[0.12, 0.12, 0.6, 8]} position={[-0.15, -0.3, 0]}>
        <meshStandardMaterial color="#1976d2" />
      </Cylinder>
      <Cylinder args={[0.12, 0.12, 0.6, 8]} position={[0.15, -0.3, 0]}>
        <meshStandardMaterial color="#1976d2" />
      </Cylinder>
    </group>
  );
};
