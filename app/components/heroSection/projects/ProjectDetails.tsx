import { Html, Plane, Text } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import useProjectStore from "../../stores/useProject";
import VideoMesh from "./VideoMesh";
import DetailCard2 from "./DetailCard2";
import { useEffect, useRef } from "react";
import useisMobile from "../hooks/useisMobile";

function getScrollPercentage() {
  // Total document height
  const documentHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  );

  // Viewport height
  const viewportHeight = window.innerHeight;

  // Maximum scrollable height
  const scrollableHeight = documentHeight - viewportHeight;

  // Current scroll position
  const currentScroll = window.scrollY;

  // Scroll percentage
  const scrollPercentage = (currentScroll / scrollableHeight) * 100;

  return scrollPercentage;
}

const ProjectDetails = () => {
  const isMobile = window.innerWidth >= 768;
  const texture = useLoader(THREE.TextureLoader, "./images/left.png");
  const textureGit = useLoader(THREE.TextureLoader, "./images/github.png");
  const project = useProjectStore((state) => state.project);
  const setVisible = useProjectStore((state) => state.hideDialog);
  const visible = useProjectStore((state) => state.visible);
  const onPointerOver = (e) => {
    e.stopPropagation();
    document.body.style.cursor = "pointer";
    e.object.material.color.set("#4d4d4d");
  };

  const onPointerOut = (e) => {
    document.body.style.cursor = "default";
    e.object.material.color.set("#878787");
  };

  const onPointerOverGit = (e) => {
    e.stopPropagation();
    document.body.style.cursor = "pointer";
    
  };

  const onPointerOutGit = (e) => {
    document.body.style.cursor = "default";
  };

  const scrollPer = useRef(0);
  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      scrollPer.current = getScrollPercentage();
      
      if (scrollPer.current <= (isMobile ?70 : 85)  || scrollPer.current >= (isMobile ? 78 : 95)) {
        setVisible();
      }
      
    });

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  return (
    <>
      <Plane
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
        args={[1, 1]}
        position={[0, isMobile ? 1.8 : 4, 8]}
        rotation={[0, -Math.PI * 0.5, 0]}
        onClick={() => {
          setVisible();
        }}
        scale={isMobile ? 1 : 1.2}
      >
        <meshStandardMaterial
          alphaMap={texture}
          transparent
          color={"#878787"}
        />
      </Plane>

      <VideoMesh position={isMobile ? [0, 0.7, 11.5] : [0, 0.7, 12]} scale={isMobile ? 1 : 1.75} videoUrl={project.video} />

      <Text
        position={[0, isMobile ? 1.6 : 3.95, isMobile ? 14.25 : 15]}
        rotation={[0, -Math.PI * 0.5, isMobile ? -Math.PI * 0.5 : 0]}
        fontSize={0.3}
        color="darkgrey"
        scale={isMobile ? 1 : 1.7}
      >
        {project.title}
      </Text>

      {/* Replace with your desired geometry */}
      {/* <boxGeometry args={[3, 3, 3]} />
        <meshStandardMaterial color="blue" /> */}
      <Html
        transform
        position={isMobile ? [0, -2, 12.36] : [0, -5.85, 12]}
        scale={isMobile ? 0.4 : 0.52}
        rotation={[0, -Math.PI * 0.5, 0]}
        style={{ opacity: 1, transition: "opacity 0.5s" }}
      >
        <DetailCard2 project={project} />
      </Html>

      <Plane
        onPointerOver={onPointerOverGit}
        onPointerOut={onPointerOutGit}
        args={[1, 1]}
        scale={isMobile ? 0.25 : 0.4}
        position={isMobile ? [0, -0.68, 14.22] : [0, -5.68, 8]}
        rotation={[0, -Math.PI * 0.5, 0]}
        onClick={() => {
            window.open(project.sourceCode, '_blank', 'noreferrer')
        }}
      >
        <meshStandardMaterial map={textureGit} transparent />
      </Plane>
    </>
  );
};

export default ProjectDetails;
