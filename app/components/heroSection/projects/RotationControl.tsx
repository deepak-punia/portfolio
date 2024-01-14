import { Plane } from "@react-three/drei";
import { useLoader, ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";

interface propTypes {
  position: [number, number, number];
  rotation: [number, number, number];
  onClick: () => void;
  icon: string;
}
const RotationControl = ({ position, rotation, onClick, icon }: propTypes) => {
  const texture = useLoader(THREE.TextureLoader as any, icon);
  const onPointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    document.body.style.cursor = "pointer";
    if (e.object instanceof THREE.Mesh) {
      // Now TypeScript knows e.object is a Mesh and has a material
      e.object.material.color.set("#4d4d4d");
    }
  };

  const onPointerOut = (e: ThreeEvent<PointerEvent>) => {
    document.body.style.cursor = "default";
    if (e.object instanceof THREE.Mesh) {
      // Now TypeScript knows e.object is a Mesh and has a material
      e.object.material.color.set("#878787");
    }
  };
  return (
    <Plane
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      args={[1, 1]}
      position={position}
      rotation={rotation}
      onClick={onClick}
    >
      <meshStandardMaterial alphaMap={texture} transparent color={"#878787"} />
    </Plane>
  );
};

export default RotationControl;
