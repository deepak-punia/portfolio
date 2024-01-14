import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import { Object3D } from "three";

interface propTypes {
  position: [number, number, number];
}
const WebModel = ({ position }: propTypes) => {
  const webModel = useGLTF("./models/scene.gltf");
  const webmodelref = useRef<Object3D>(null);
  webModel.scene.children[0]?.children[0].traverse(function (child: Object3D) {
    if ((child as any).isMesh) {
      child.castShadow = true;
    }
  });

  useFrame((state, delta) => {
    if (webmodelref.current) {
      webmodelref.current.rotation.y += delta * 0.4;
    }
  });
  return (
    <primitive
      ref={webmodelref}
      object={webModel.scene}
      scale={0.15}
      position={position}
    />
  );
};

export default WebModel;
