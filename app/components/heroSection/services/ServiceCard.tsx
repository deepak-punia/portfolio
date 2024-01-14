import { RoundedBox, Text } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { MutableRefObject, useRef } from "react";
import * as THREE from "three";
import useisMobile from "../hooks/useisMobile";

interface propTypes {
  scrollPer: MutableRefObject<number>;
  icon: string;
  text: string;
  heading: string;
  position: [number, number, number];
  positionsm: [number, number, number];
  scrollThrushold: number;
  scrollThrusholdsm: number;
  size?: [number, number, number] | undefined;
  color?: string | undefined;
}
const ServiceCard = ({
  scrollPer,
  position,
  positionsm,
  scrollThrusholdsm,
  scrollThrushold,
  icon,
  text,
  heading,
  size = [2.45, 1.4, 0.1],
  color = "#f0f0f0",
}: propTypes) => {
  const meshRef = useRef<THREE.Group>(null);
  const hoverRef = useRef(false); // Using ref instead of state

  const isMobile = window.innerWidth >= 768;

  const texture = useLoader(THREE.TextureLoader as any, icon); // Load icon texture
  const iconsizevar = isMobile ? 0.4 : 2;
  const thrushold = isMobile ? scrollThrushold : scrollThrusholdsm;
  // Adjust these values as needed
  const iconSize: [number, number] = [iconsizevar, iconsizevar]; // Width and height of the icon
  const iconPosition: [number, number, number] = [
    -size[0] / 2 + iconSize[0] / 2 + 0.1,
    size[1] / 2 - iconSize[1] / 2 - 0.1,
    size[2] / 2 + 0.01,
  ];
  const headingPosition: [number, number, number] = [
    -size[0] / 2 + iconSize[0] + 0.2,
    size[1] / 2 - (isMobile ? 0.1 : 0.25),
    size[2] / 2 + 0.01,
  ];
  const descriptionPosition: [number, number, number] = [
    -size[0] / 2 + iconSize[0] + 0.2,
    size[1] / 2 - (isMobile ? 0.4 : 1),
    size[2] / 2 + 0.01,
  ];

  useFrame(() => {
    const visible = scrollPer.current >= thrushold;
    if (meshRef.current) {
      meshRef.current.scale.lerp(
        new THREE.Vector3(visible ? 1 : 0, visible ? 1 : 0, visible ? 1 : 0),
        0.1
      );
    }

    if (hoverRef.current && meshRef.current) {
      const scale = hoverRef.current ? 1.2 : 1; // 20% larger when hovered
      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
    }
  });

  return (
    <group
      ref={meshRef}
      scale={0}
      position={isMobile ? position : positionsm}
      rotation-y={-Math.PI * 0.5}
      onPointerOver={() => (hoverRef.current = true)}
      onPointerOut={() => (hoverRef.current = false)}
    >
      <RoundedBox args={size} radius={0.05} smoothness={4}>
        <meshStandardMaterial attach="material" color={color} />
      </RoundedBox>
      <mesh position={iconPosition}>
        <planeGeometry args={iconSize} />
        <meshStandardMaterial map={texture} transparent />
      </mesh>
      <Text
        position={headingPosition}
        fontSize={isMobile ? 0.2 : 0.55}
        color="#5A5A5A"
        anchorX="left"
        anchorY="top"
      >
        {heading}
      </Text>
      <Text
        position={descriptionPosition}
        fontSize={isMobile ? 0.15 : 0.45}
        color="#808080"
        anchorX="left"
        anchorY="top"
        maxWidth={isMobile ? 1.8 : 5}
      >
        {text}
      </Text>
    </group>
  );
};

export default ServiceCard;
