import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import useisMobile from "./hooks/useisMobile";

const TechStackSquare = ({ position, texture, scrollPer }) => {
  
  const isMobile = window.innerWidth >= 768;
  const textureLoad = new THREE.TextureLoader().load(texture.textureimg);
  const meshRef = useRef();
  const textRef = useRef();
  const hoverRef = useRef(false); // Using ref instead of state

  // Animate square visibility
  useFrame(() => {
    const visible =
      scrollPer.current >= texture.scrollThrushold && scrollPer.current <= (isMobile ? 35 : 100);
    meshRef.current.scale.lerp(
      new THREE.Vector3(
        visible ? (isMobile ? 1 : 2) : 0,
        visible ? (isMobile ? 1 : 2) : 0,
        visible ? (isMobile ? 1 : 2) : 0
      ),
      0.1
    );

    if (hoverRef.current) {
      const scale = hoverRef.current
        ? isMobile
          ? 1.2
          : 2.4
        : 1; // 20% larger when hovered
      meshRef.current.scale.lerp({ x: scale, y: scale, z: scale }, 0.1);
    }
    textRef.current.visible = hoverRef.current; // Control visibility of text
  });

  return (
    <>
      <mesh
        ref={meshRef}
        rotation-y={Math.PI * 0.5}
        position={position}
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
