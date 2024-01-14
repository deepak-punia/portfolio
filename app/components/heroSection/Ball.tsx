interface propTypes {
  position: [number, number, number];
  color: string;
  scale: number;
}
const Ball = ({ position, color, scale }: propTypes) => (
  <mesh scale={scale} position={position}>
    <sphereGeometry args={[0.1, 32, 32]} />
    <meshStandardMaterial color={color} />
  </mesh>
);

export default Ball;
