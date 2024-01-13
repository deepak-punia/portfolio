import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";

const WebModel = ({ position }) => {
  const webModel = useGLTF("./models/scene.gltf");
  const webmodelref = useRef();
  webModel.scene.children[0]?.children[0].traverse(function (child) {
    if (child.isMesh) {
      child.castShadow = true;
    }
  });

  useFrame((state, delta) => {
    webmodelref.current.rotation.y += delta * 0.4;
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
