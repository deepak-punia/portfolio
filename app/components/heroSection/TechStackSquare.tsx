import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import * as THREE from "three";

// Types import
import { Mesh, Object3D } from "three";

interface propTypes {
  position: number[];
  texture: {
    textureimg: string;
    text: string;
    scrollThrushold: number;
  };
  scrollPer: React.MutableRefObject<number>;
}
const TechStackSquare = ({ position, texture, scrollPer }: propTypes) => {
  const isMobile = window.innerWidth >= 768;
  const textureLoad = new THREE.TextureLoader().load(texture.textureimg);
  const meshRef = useRef<Mesh>(null);
  const textRef = useRef<Object3D>(null);
  const hoverRef = useRef(false); // Using ref instead of state

  // Animate square visibility
  useFrame(() => {
    const visible =
      scrollPer.current >= texture.scrollThrushold &&
      scrollPer.current <= (isMobile ? 35 : 100);
    if (meshRef.current) {
      meshRef.current.scale.lerp(
        new THREE.Vector3(
          visible ? (isMobile ? 1 : 2) : 0,
          visible ? (isMobile ? 1 : 2) : 0,
          visible ? (isMobile ? 1 : 2) : 0
        ),
        0.1
      );
    }

    if (hoverRef.current && meshRef.current) {
      const scale = hoverRef.current ? (isMobile ? 1.2 : 2.4) : 1; // 20% larger when hovered
      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
    }
    if (textRef.current) {
      textRef.current.visible = hoverRef.current; // Control visibility of text
    }
  });

  return (
    <>
      <mesh
        ref={meshRef}
        rotation-y={Math.PI * 0.5}
        position={new THREE.Vector3(...position)}
        scale={0}
        onPointerOver={() => (hoverRef.current = true)}
        onPointerOut={() => (hoverRef.current = false)}
      >
        <boxGeometry args={[0.7, 0.7, 0.1]} />
        <meshStandardMaterial attach="material-0" color="lightblue" />
        <meshStandardMaterial attach="material-1" color="lightblue" />
        <meshStandardMaterial attach="material-2" color="lightblue" />
        <meshStandardMaterial attach="material-3" color="lightblue" />
        <meshStandardMaterial attach="material-4" color="lightblue" />
        <meshStandardMaterial attach="material-5" map={textureLoad} />
      </mesh>
      <Text
        ref={textRef}
        position={[
          position[0] - 0.1,
          position[1] - (isMobile ? 0.55 : 0.95),
          position[2],
        ]}
        fontSize={isMobile ? 0.2 : 0.3}
        color="grey"
        rotation-y={-Math.PI * 0.5}
      >
        {texture.text}
      </Text>
    </>
  );
};

export default TechStackSquare;
