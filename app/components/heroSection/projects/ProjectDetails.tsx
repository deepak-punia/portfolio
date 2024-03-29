import { Html, Plane, Text } from "@react-three/drei";
import { useLoader, ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import useProjectStore from "../../stores/useProject";
import VideoMesh from "./VideoMesh";
import DetailCard2 from "./DetailCard2";
import { Suspense, useEffect, useRef, MutableRefObject } from "react";

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

interface propTypes {
  historyPushed: MutableRefObject<boolean>;
}
const ProjectDetails = ({ historyPushed }: propTypes) => {
  const isMobile = window.innerWidth >= 768;
  const texture = useLoader(THREE.TextureLoader as any, "./images/left.png");
  const textureGit = useLoader(
    THREE.TextureLoader as any,
    "./images/github.png"
  );
  const project = useProjectStore((state) => state.project);
  const setVisible = useProjectStore((state) => state.hideDialog);
  const visible = useProjectStore((state) => state.visible);
  const onPointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    document.body.style.cursor = "pointer";
    if (e.object instanceof THREE.Mesh) {
      e.object.material.color.set("#4d4d4d");
    }
  };

  const onPointerOut = (e: ThreeEvent<PointerEvent>) => {
    document.body.style.cursor = "default";
    if (e.object instanceof THREE.Mesh) {
      e.object.material.color.set("#878787");
    }
  };

  const onPointerOverGit = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    document.body.style.cursor = "pointer";
  };

  const onPointerOutGit = (e: ThreeEvent<PointerEvent>) => {
    document.body.style.cursor = "default";
  };

  const scrollPer = useRef(0);

  useEffect(() => {
    if (!historyPushed.current) {
      // Push a new entry into the history stack
      window.history.pushState(null, document.title, window.location.href);
      historyPushed.current = true;
    }

    // Define the function to execute when the back button is pressed
    const handleBackButton = (event: any) => {
      // Your custom logic here
      setVisible();
      historyPushed.current = false;
      // Display a warning message

      // Push it again in the history stack, effectively "ignoring" the back action
      window.history.pushState(null, document.title, window.location.href);
    };
    // Add event listener for popstate
    window.addEventListener("popstate", handleBackButton);

    window.addEventListener("scroll", (e) => {
      scrollPer.current = getScrollPercentage();

      if (
        scrollPer.current <= (isMobile ? 70 : 85) ||
        scrollPer.current >= (isMobile ? 78 : 95)
      ) {
        setVisible();
      }
    });

    return () => {
      window.removeEventListener("scroll", () => {});
      window.removeEventListener("popstate", handleBackButton);
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

      <Suspense
        fallback={
          <Html center>
            <div className="custom-loader"></div>
          </Html>
        }
      >
        <VideoMesh
          position={isMobile ? [0, 0.7, 11.5] : [0, 0.7, 12]}
          scale={isMobile ? 1 : 1.75}
          videoUrl={project?.video ? project.video : ""}
        />
      </Suspense>

      <Text
        position={[0, isMobile ? 1.6 : 3.95, isMobile ? 14.25 : 15]}
        rotation={[0, -Math.PI * 0.5, isMobile ? -Math.PI * 0.5 : 0]}
        fontSize={0.3}
        color="darkgrey"
        scale={isMobile ? 1 : 1.7}
      >
        {project?.title}
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
          window.open(project?.sourceCode, "_blank", "noreferrer");
        }}
      >
        <meshStandardMaterial map={textureGit} transparent />
      </Plane>
    </>
  );
};

export default ProjectDetails;
