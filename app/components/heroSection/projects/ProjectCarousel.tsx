import { useFrame } from "@react-three/fiber";
import ProjectCard from "./ProjectCard";
import * as THREE from "three";
import { useRef, MutableRefObject } from "react";
import RotationControl from "./RotationControl";
import useProjectStore from "../../stores/useProject";
import ProjectDetails from "./ProjectDetails";
import { useGesture } from "@use-gesture/react";

interface propTypes {
  projects: {
    title: string;
    description: string;
    image: string;
    video: string;
    technologies: string[];
    features: string[];
    link: string;
    sourceCode: string;
  }[];
  selectedProjectRef: MutableRefObject<null>;
}
const ProjectCarousel = ({ projects, selectedProjectRef }: propTypes) => {
  const isMobile = window.innerWidth >= 768;
  // to keeo track of histry pushed into broswer stack
  const historyPushed = useRef(false);
  const visible = useProjectStore((state) => state.visible);
  const groupRef = useRef<THREE.Group>(null);
  const allgroupRef = useRef<THREE.Group>(null);
  const targetRotationRef = useRef(0);
  const currentRotationRef = useRef(0);
  const lerpFactor = 0.05; // Adjust for smoother or faster rotation

  const rotateStep = (Math.PI * 2) / projects.length; // Rotation step based on number of projects

  const rotateCarousel = (direction: number) => {
    targetRotationRef.current += direction * rotateStep;
    // Rotate left or right
  };

  const setProject = useProjectStore((state) => state.setProject);
  // Use a ref to track whether the swipe action has been initiated
  const swipeInitiated = useRef(false);
  const bind = useGesture({
    onDrag: ({ movement: [mx], down, cancel }) => {
      if (down && !swipeInitiated.current && Math.abs(mx) > 50) {
        swipeInitiated.current = true; // Mark swipe as initiated
        rotateCarousel(mx > 0 ? 1 : -1);
        // debounce 300ms to prevent multiple swipes at once
        setTimeout(() => (swipeInitiated.current = false), 300);
        if (cancel) cancel();
      } else if (!down) {
        swipeInitiated.current = false; // Reset swipe state when touch ends
      }
    },
  });

  useFrame(() => {
    currentRotationRef.current = THREE.MathUtils.lerp(
      currentRotationRef.current,
      targetRotationRef.current,
      lerpFactor
    );
    if (groupRef.current) {
      groupRef.current.rotation.y = currentRotationRef.current;
    }

    const targetposition = visible ? -12 : 0;

    if (allgroupRef.current) {
      allgroupRef.current.position.z = THREE.MathUtils.lerp(
        allgroupRef.current.position.z,
        targetposition,
        0.1
      );
    }
  });

  return (
    <>
      {/* @ts-ignore */}
      <group ref={allgroupRef} {...bind()}>
        <group ref={groupRef}>
          {projects.map((project, index) => {
            const angle = (index / projects.length) * Math.PI * 2;
            const x = Math.sin(angle) * 2.5; // Adjust radius as needed
            const z = Math.cos(angle) * 2.5;
            return (
              <ProjectCard
                key={index}
                position={[x, 0, z]}
                rotationy={angle}
                {...project}
                onClick={() => setProject(project)}
              />
            );
          })}
        </group>
        <RotationControl
          position={[
            isMobile ? 0 : -2.4,
            isMobile ? 0 : -3,
            isMobile ? 4.5 : 2,
          ]}
          rotation={[0, -Math.PI * 0.5, 0]}
          onClick={() => rotateCarousel(-1)}
          icon="./images/right.png"
        />
        <RotationControl
          position={[
            isMobile ? 0 : -2.4,
            isMobile ? 0 : -3,
            isMobile ? -4.5 : -2,
          ]}
          rotation={[0, -Math.PI * 0.5, 0]}
          onClick={() => rotateCarousel(1)}
          icon="./images/left.png"
        />

        {/* Project Details */}
        {visible && <ProjectDetails historyPushed={historyPushed} />}
      </group>
    </>
  );
};
export default ProjectCarousel;
