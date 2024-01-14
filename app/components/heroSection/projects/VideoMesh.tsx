import React, { useRef, useEffect, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { Html } from "@react-three/drei";

interface propTypes {
  videoUrl: string;
  scale: number;
  position: [number, number, number];
}
const VideoMesh = ({ videoUrl, scale, position }: propTypes) => {
  // Ref for the mesh
  const meshRef = useRef<THREE.Mesh>(null);
  const loaderRef = useRef<THREE.Group>(null);
  const loading = useRef(true);
  const video = document.createElement("video");

  const videoTextureRef = useRef<THREE.VideoTexture | null>(null);
  // Create video element
  useEffect(() => {
    video.src = videoUrl;
    video.load();
    video.onloadeddata = (event) => {
      loading.current = false;
    };
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
    if (loaderRef.current && !loading.current) {
      loaderRef.current.scale.set(0, 0, 0);
    }
    // if (meshRef.current && meshRef.current.material.map) {
    //     meshRef.current.material.map.needsUpdate = true;
    //   }
  });

  return (
    <>
      <group ref={loaderRef}>
        <Html center position={position}>
          <div className="custom-loader"></div>
        </Html>
      </group>
      <mesh
        ref={meshRef}
        position={position}
        rotation={[0, -Math.PI * 0.5, 0]}
        scale={scale}
      >
        <planeBufferGeometry args={[5, 3]} />
        <meshBasicMaterial attach="material" map={videoTextureRef.current} />
      </mesh>
    </>
  );
};

export default VideoMesh;
