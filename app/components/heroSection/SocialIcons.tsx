import { useGLTF } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";

const SocialIcons = () => {
  const linkedinModel = useGLTF("./models/linkedinicon.gltf");
  const whatsappModel = useGLTF("./models/whatsappicon.gltf");
  const gitModel = useGLTF("./models/giticon.gltf");

  const onPointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    document.body.style.cursor = "pointer";
  };

  const onPointerOut = (e: ThreeEvent<PointerEvent>) => {
    document.body.style.cursor = "default";
  };

  return (
    <>
      {/* whatsappModel Model */}
      <primitive
        object={whatsappModel.scene}
        scale={0.8}
        position={[0, -5, -2]}
        rotation-y={-Math.PI * 0.5}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
        onClick={() => {
          window.open("https://wa.me/14377778754", "_blank", "noreferrer");
        }}
      />
      {/* gitModel Model */}
      <primitive
        object={gitModel.scene}
        scale={0.07}
        position={[0, -5, -1]}
        rotation-y={-Math.PI * 0.5}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
        onClick={() => {
          window.open(
            "https://github.com/deepak-punia/",
            "_blank",
            "noreferrer"
          );
        }}
      />
      {/* Linkedin Model */}
      <primitive
        object={linkedinModel.scene}
        scale={0.8}
        position={[0, -5, 0.2]}
        rotation-y={-Math.PI * 0.5}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
        onClick={() => {
          window.open(
            "https://linkedin.com/in/puniadeepak",
            "_blank",
            "noreferrer"
          );
        }}
      />
    </>
  );
};

export default SocialIcons;
