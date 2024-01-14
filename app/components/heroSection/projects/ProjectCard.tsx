//Projects

import { RoundedBox, Text } from "@react-three/drei";
import { useLoader, ThreeEvent } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import useisMobile from "../hooks/useisMobile";

interface propTypes {
  position: [number, number, number];
  onClick: any;
  rotationy: any;
  title: string;
  description: string;
  image: string;
  video?: string;
  technologies?: string[];
  features?: string[];
  link?: string;
  sourceCode?: string;
}
const ProjectCard = ({
  position,
  title,
  onClick,
  description,
  image,
  rotationy,
}: propTypes) => {
  const isMobile = window.innerWidth >= 768;
  const projectCardRef = useRef<THREE.Group>(null);
  const texture = useLoader(THREE.TextureLoader as any, image);
  const onPointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    document.body.style.cursor = "pointer";
  };

  const onPointerOut = (e: ThreeEvent<PointerEvent>) => {
    document.body.style.cursor = "default";
  };
  return (
    <group
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      scale={isMobile ? 1 : 1.7}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      ref={projectCardRef}
      position={position}
      rotation-y={rotationy}
    >
      <RoundedBox args={[3, 2, 0.1]} radius={0.1} smoothness={10}>
        <meshStandardMaterial color="#f0f0f0" transparent={true} />
      </RoundedBox>
      <mesh position={[0, 0, 0.06]}>
        <planeGeometry args={[2.8, 1.8]} />
        <meshBasicMaterial map={texture} />
      </mesh>
      <Text
        position={[0, -1, 0.06]}
        fontSize={0.2}
        color="darkgrey"
        anchorX="center"
        anchorY="middle"
      >
        {title}
      </Text>
      <Text
        maxWidth={2.8}
        textAlign={"center"}
        position={[0, -1.3, 0.06]}
        fontSize={0.1}
        color="grey"
        anchorX="center"
        anchorY="middle"
      >
        {description}
      </Text>
    </group>
  );
};

export default ProjectCard;
