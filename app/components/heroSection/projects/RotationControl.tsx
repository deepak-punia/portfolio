import { Plane } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

const RotationControl = ({ position, rotation, onClick, icon }) => {
    const texture = useLoader(THREE.TextureLoader, icon);
    const onPointerOver = (e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
        e.object.material.color.set("#4d4d4d");
      };
    
      const onPointerOut = (e) => {
        document.body.style.cursor = 'default';
        e.object.material.color.set("#878787");
      };
    return (
      <Plane onPointerOver={onPointerOver}
      onPointerOut={onPointerOut} args={[1, 1]} position={position} rotation={rotation} onClick={onClick}>
        <meshStandardMaterial alphaMap={texture} transparent color={"#878787"}/>
      </Plane>
    );
  };

  export default RotationControl