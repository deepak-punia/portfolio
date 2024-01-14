import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { MutableRefObject } from "react";

interface propTypes {
  position: [number, number, number];
  fontSize: number;
  scrollPer: MutableRefObject<number>;
  text: string;
}
const AddText = ({ position, fontSize, scrollPer, text }: propTypes) => {
  const textRef = useRef<THREE.Object3D>(null);

  // Animate square visibility
  useFrame(() => {
    const visible = scrollPer.current >= 11 && scrollPer.current <= 35;
    if (textRef.current) {
      textRef.current.scale.lerp(
        new THREE.Vector3(visible ? 1 : 0, visible ? 1 : 0, visible ? 1 : 0),
        0.1
      );
    }
  });

  return (
    <Text
      ref={textRef}
      position={position}
      rotation-y={-Math.PI * 0.5}
      fontSize={fontSize}
      scale={0}
      color={"grey"}
    >
      {" "}
      {text}
    </Text>
  );
};

export default AddText;
