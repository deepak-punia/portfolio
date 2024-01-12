import React, { useRef, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

const VideoMesh = ({ videoUrl , scale, position}) => {
  // Ref for the mesh
  const meshRef = useRef();
  const video = document.createElement("video");
  const videoTextureRef = useRef();
  // Create video element
  useEffect(() => {
    video.src = videoUrl;
    video.load();
    video.play();
    video.crossOrigin = "anonymous";
    video.loop = true;
    video.muted = true;

    return () => {
      // Dispose texture on unmount
      if (videoTextureRef.current !== null) {
        videoTextureRef.current.dispose();
      }
    };
  }, [videoUrl]);

  videoTextureRef.current = new THREE.VideoTexture(video);

  // Update texture in each frame (if video is playing)
  useFrame(() => {
    // if (meshRef.current && meshRef.current.material.map) {
    //     meshRef.current.material.map.needsUpdate = true;
    //   }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={[0, -Math.PI * 0.5, 0]} 
      scale={scale}
    >
      <planeBufferGeometry args={[5, 3]} />
      <meshBasicMaterial attach="material" map={videoTextureRef.current} />
    </mesh>
  );
};

export default VideoMesh;
